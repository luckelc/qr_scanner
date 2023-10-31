// TODO : Instantiate the QuestionForm from here and then if user has made input in the form, change to the main layout again.

import QuestionForm from "@/components/QuestionForm";
import { Html5Qrcode } from "html5-qrcode";
import React, { useState, useEffect, useContext } from "react";
import { QuestionContext } from "@/components/ContextProvider";
const qrcodeRegionId = "reader";
const questionIdKey = "qrScannerApp#";

export default function Html5QrcodePlugin({ exitScanner }) {
	const contextValue = useContext(QuestionContext);
	const questionData = contextValue !== undefined ? contextValue[0] : undefined;
	const [questionFormVisibility, setQuestionFormVisibility] = useState(false);
	const [selectedQuestionData, setSelectedQuestionData] = useState(null);

	useEffect(() => {
		console.log(questionData);
		// This method will trigger user permissions
		Html5Qrcode.getCameras()
			.then((devices) => {
				/*
				 * devices would be an array of objects of type:
				 * { id: "id", label: "label" }
				 */
				if (devices && devices.length) {
					var cameraId = devices.find(device => device.label.toLowerCase().includes('back'))?.id || devices[0].id;
					const html5QrCode = new Html5Qrcode("reader");
					html5QrCode
						.start(
							cameraId,
							{
								fps: 10, // Optional, frame per seconds for qr code scanning
							},
							(decodedText, decodedResult) => {

								if(decodedText.includes(questionIdKey)){
									let result = decodedText.split(questionIdKey)[1];

									if (Array.isArray(questionData)) {
										questionData.forEach((question) => {
											if (
												question.id == result &&
												question.found != true
											) {
												html5QrCode
													.stop()
													.then((ignore) => {
														setSelectedQuestionData(
															question
														);
														setQuestionFormVisibility(
															true
														);
													})
													.catch((err) => {
														console.error(
															"Something went wrong, please rescan the qrcode"
														);
													});
											}
										});
									}
								}

							},
							(errorMessage) => {
								// parse error, ignore it.
							}
						)
						.catch((err) => {
						});

					document
						.getElementById("go_back")
						.addEventListener("click", function () {
							if (html5QrCode.isScanning) {
								html5QrCode
									.stop()
									.then((ignore) => {
										exitScanner();
									})
									.catch((err) => {});
							}
						});
				}
			})
			.catch((err) => {
				alert('Webbsidan behöver tillgång till kamera för att fungera, ladda om sidan och försök igen.')
			});
	}, []);

	return (
		<>
			{questionFormVisibility && (
				<QuestionForm
					onExit={() => exitScanner()}
					question={selectedQuestionData}
				/>
			)}

			<div
				id={qrcodeRegionId}
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			></div>
		</>
	);
}
