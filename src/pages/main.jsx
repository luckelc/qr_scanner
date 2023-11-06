"use strict";
import React, { useState, useEffect, useContext } from "react";
import { QuestionContext } from "@/components/ContextProvider";
import Head from "next/head";
import styles from "@/styles/dist/main.module.css";
import QuestionRow from "@/components/QuestionRow";
import Html5QrcodePlugin from "@/components/Html5QrcodePlugin";
import QuestionForm from "@/components/QuestionForm";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get } from "firebase/database";
import MailCollector from "@/components/MailCollector";
import GiveUpForm from "@/components/GiveUpForm";
import SubmitForm from "@/components/SubmitForm";
import FinishScreen from "@/components/FinishScreen";
import useLocalStorage from "@/components/LocalStorageHook";
import LoadingScreen from "@/components/LoadingScreen";

// User_mail and firebase setup
const firebaseConfig = {
	apiKey: "AIzaSyB0RUhBocGEgEsjD3CPCpNfwz9L813Qge8",
	authDomain: "qr-scanner-ff324.firebaseapp.com",
	databaseURL:
		"https://qr-scanner-ff324-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "qr-scanner-ff324",
	storageBucket: "qr-scanner-ff324.appspot.com",
	messagingSenderId: "371473474823",
	appId: "1:371473474823:web:f503a1f5d751a55b4291a2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = ref(getDatabase(app), "user_data");

function createUserEntry(userMail, userPoints) {
	return {
		mail: userMail,
		points: userPoints,
	};
}

async function GetUserData() {
	try {
		const snapshot = await get(db);

		if (snapshot.exists()) {
			const jsonArray = Object.entries(snapshot.val()).map(
				([key, value]) => ({ key, value })
			);
			return jsonArray;
		} else {
			return null; // Returning null to indicate no data
		}
	} catch (error) {
		console.error(error);
		return null; // Returning null in case of an error
	}
}
const localStorageMailKey = "user_mail";



export default function QrScannerHomePage() {
	const contextValue = useContext(QuestionContext);
	const questionData =
		contextValue !== undefined ? contextValue[0] : undefined;
	const setQuestionData =
		contextValue !== undefined ? contextValue[1] : undefined;
	const [selectedQuestionData, setSelectedQuestionData] = useState(null);
	const [isQuestionFormVisible, setQuestionFormVisibility] = useState(false);
	const [isScannerVisible, setIsScannerVisible] = useState(false);
	const [isMailCollected, setIsMailColleted] = useState(false);
	const [isGiveUpFormVisible, setGiveUpFormVisibility] = useState(false);
	const [isSubmitFormVisible, setSubmitFormVisibility] = useState(false);
	const [isAllQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
	const [isFinished, setFinished] = useLocalStorage('isfinished', false);
	const [isLoading, setLoading] = useState(false);

	async function handleSendEmail(userMail) {
		try {
			const response = await fetch("/api/sendEmail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Set the content type as JSON
				},
				body: JSON.stringify({ content: userMail }), // You can send data in the request body if needed
			});
	
			if (response.ok) {
				const data = await response.json();
	
				if (data.success) {
					console.log("Email sent successfully");
					setFinished(true);
					// alert("Email sent successfully");
				} else {
					console.error("Email sending failed");
					alert("Email sending failed");
				}
			} else {
				console.error("Email sending failed");
				alert("Email sending failed");
			}
			setLoading(false);
		} catch (error) {
			console.error("Error sending email:", error);
		}
	}

	function toggleQuestionFormVisibilityText(selectedQuestion) {
		setQuestionFormVisibility(true);
		setSelectedQuestionData(selectedQuestion); // Store the selected question data
	}

	const checkUserEntry = async (userMail) => {
		const user_data = await GetUserData();
		if (user_data) {
			for (const userData of user_data) {
				if (userMail === userData.value.mail) {
					return true;
				}
			}
		}
		return false;
	};

	async function pushUserEntry(extraPoints) {
		const userMail = localStorage.getItem(localStorageMailKey);
		let totalPoints = 0 - extraPoints;
		questionData.forEach((question) => {
			if (
				question.found &&
				question.userInput === question.correctAnswer
			) {
				totalPoints += question.points;
			}
		});
		if (await checkUserEntry(userMail)) {
		} else {
			push(db, createUserEntry(userMail, totalPoints));
		}
		setLoading(true);
		handleSendEmail(userMail);
		console.log(totalPoints);
		console.log("You sent in your form");
	}

	async function SetUserMail(userMail) {
		if (await checkUserEntry(userMail)) {
			alert("Ett bidrag har redan skickats in med detta mail, vänligen välj ett annat.");
			console.log("There is already a key with that email");
		} else {
			setIsMailColleted(userMail);
			localStorage.setItem(localStorageMailKey, userMail);
		}
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.TurnAllFound = function () {
				const updatedQuestions = questionData.map((q) => {
					// Clone the question object to avoid direct mutation
					return {
						...q,
						userInput: "",
						found: true,
					};
				});
				setQuestionData(updatedQuestions);
				return true;
			};

			// Get the stored mail, if there is one.
			const storedData = localStorage.getItem(localStorageMailKey);
			setIsMailColleted(storedData);
			if (isMailCollected) console.log("The mail is " + isMailCollected);
		}
	}, []);

	useEffect(() => {
		if (questionData && questionData.length > 0) {
			const allFound = questionData.every(
				(obj) => obj.hasOwnProperty("found") && obj.found === true
			);
			if (allFound) {
				console.log("You found them all!!!");
				setAllQuestionsAnswered(true);
			}
		}
	}, [questionData]);

	return (
		<>
			<Head>
				<title>Qr Scanner</title>
				<meta charSet="UTF-8" />
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>

			<div className={styles.main}>
				{isLoading && <LoadingScreen />}
				{isFinished ? (
					<FinishScreen />
				) : (
					<>
						<div className={styles.main_nav}>
							{isScannerVisible ? (
								<button id="go_back" className={styles.go_back}>
									<svg
										height="800px"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5 12H19M5 12L11 6M5 12L11 18"
											stroke="#FFFFFF"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							) : (
								<div></div>
							)}

							<button
								className={styles.give_up}
								onClick={() => setGiveUpFormVisibility(true)}
							>
								<svg
									viewBox="0 -0.5 25 25"
									width="30px"
									height="30px"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
										fill="#FFFFFF"
									/>
								</svg>
							</button>
						</div>

						{isGiveUpFormVisible && (
							<GiveUpForm
								canceled={() => setGiveUpFormVisibility(false)}
								proceeded={() => setSubmitFormVisibility(true)}
							/>
						)}

						{!isMailCollected && (
							<MailCollector onSubmit={SetUserMail} />
						)}

						{isSubmitFormVisible && (
							<SubmitForm
								submissionPoints={(e) => {
									pushUserEntry(e);
									setSubmitFormVisibility(false);
								}}
							/>
						)}

						{isScannerVisible ? (
							<div
								className={`${styles.scanner} ${styles.content}`}
							>
								<Html5QrcodePlugin
									exitScanner={() =>
										setIsScannerVisible(false)
									}
									questionData={questionData}
								/>
							</div>
						) : (
							<div className={styles.content}>
								{isQuestionFormVisible && (
									<QuestionForm
										onExit={() =>
											setQuestionFormVisibility(false)
										}
										question={selectedQuestionData}
									/>
								)}
								<div className={styles.container}>
									<h1 className={styles.h1}>
										QR Scanning Code
									</h1>

									<ul>
										{questionData &&
											questionData.length > 0 &&
											questionData.map(
												(question, index) => (
													<QuestionRow
														key={index}
														onClick={
															toggleQuestionFormVisibilityText
														}
														question={question}
													/>
												)
											)}
									</ul>
								</div>

								<div className={styles.nav}>
									<div className={styles.navGroup}>
										{isAllQuestionsAnswered ? (
											<button
												onClick={() =>
													setSubmitFormVisibility(
														true
													)
												}
												className={
													styles.primary_button
												}
											>
												FORTSÄTT
											</button>
										) : (
											<button
												onClick={() =>
													setIsScannerVisible(true)
												}
												className={
													styles.primary_button
												}
											>
												SKANNA QR KOD
											</button>
										)}
									</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}
