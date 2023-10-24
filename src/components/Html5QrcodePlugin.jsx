// TODO : Instantiate the QuestionForm from here and then if user has made input in the form, change to the main layout again.

import QuestionForm from '@/components/QuestionForm'
import { Html5Qrcode } from 'html5-qrcode';
import React, {useState, useEffect } from 'react';
import {getQuestionArray} from '@/components/ContextProvider'
const qrcodeRegionId = 'reader';
const questionIdKey = 'qrScannerApp#'

const Html5QrcodePlugin = ({removeScanner}) => {
    const [questionData, setQuestionData] = getQuestionArray();
    const [questionFormVisibility, setQuestionFormVisibility] = useState(false);
    const [selectedQuestionData, setSelectedQuestionData] = useState(null);

    function exitToQuestions(){
        removeScanner()
    }

    useEffect(() => {
        console.log(questionData)
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {
            /*
                * devices would be an array of objects of type:
                * { id: "id", label: "label" }
            */
            if (devices && devices.length) {
                var cameraId = devices[0].id;
                const html5QrCode = new Html5Qrcode('reader');
                html5QrCode.start(
                cameraId, 
                {
                    fps: 10,    // Optional, frame per seconds for qr code scanning
                },
                (decodedText, decodedResult) => {
                    console.log(decodedText)
                    
                    if (Array.isArray(questionData)) {
                        questionData.forEach(question => {
                            if(question.id == decodedText && question.found != true){
                                html5QrCode.stop().then((ignore) => {
                                    setSelectedQuestionData(question)
                                    setQuestionFormVisibility(true)
                                }).catch((err) => {
                                    console.error('Something went wrong, please rescan the qrcode')
                                });
                            }
                        });
                    }
                },
                (errorMessage) => {
                    // parse error, ignore it.
                })
                .catch((err) => {
                // Start failed, handle it.
                });

                document.getElementById('go_back').addEventListener("click", function() {
                    if(html5QrCode.isScanning){
                        html5QrCode.stop().then((ignore) => {
                            removeScanner()
    
                        }).catch((err) => {
    
                        });
                    }
                        
                });

            }
        }).catch(err => {
            // handle err
        });

    }, []);

    return (
        <>
            {questionFormVisibility? (<QuestionForm onExit={exitToQuestions} question={selectedQuestionData}/>) : ('')}
            <div id={qrcodeRegionId} style={{height: '100%', backgroundColor: 'blue', display: 'flex', flexDirection: 'column', justifyContent: 'center'} } > </div>
        </>
    );
};

export default Html5QrcodePlugin;