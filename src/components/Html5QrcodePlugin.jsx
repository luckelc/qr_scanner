// TODO : Instantiate the QuestionForm from here and then if user has made input in the form, change to the main layout again.

import QuestionForm from '@/components/QuestionForm'
import { Html5Qrcode } from 'html5-qrcode';
import { QuestionContext } from '@/pages/main'
import React, {useContext, useState, useEffect } from 'react';
const qrcodeRegionId = "reader";
import {getQuestionArray} from '@/components/ContextProvider'

const Html5QrcodePlugin = ({removeScanner}) => {

    const [questionData, setQuestionData] = getQuestionArray();
    const [questionFormVisibility, setQuestionFormVisibility] = useState(false);
    const [selectedQuestionData, setSelectedQuestionData] = useState(null);

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
                    
                    if (Array.isArray(questionData)) {
                        questionData.forEach(question => {
                            if(question.id == decodedText && question.found != true){
                                question.found = true;
                                setSelectedQuestionData(question)
                                setQuestionFormVisibility(true)
                            }
                        });
                    }
                    
                    /*
                    html5QrCode.stop().then((ignore) => {
                        resultFromScan(decodedText);
                        removeScanner(false)


                    }).catch((err) => {
                        // Stop failed, handle it.
                    });
                    */
                },
                (errorMessage) => {
                    // parse error, ignore it.
                })
                .catch((err) => {
                // Start failed, handle it.
                });

                document.getElementById('goBack').addEventListener("click", function() {
                    html5QrCode.stop().then((ignore) => {
                        removeScanner(false)

                    }).catch((err) => {
                        console.log('err')
                    });
                        
                });

            }
        }).catch(err => {
            // handle err
        });

    }, []);

    return (
        <>
            {questionFormVisibility? (<QuestionForm question={selectedQuestionData}/>) : ('')}
            <div id={qrcodeRegionId} style={{height: '100%', backgroundColor: 'blue', display: 'flex', flexDirection: 'column', justifyContent: 'center'} } > </div>
            <button id='goBack' style={{position: 'fixed', left: '0', top: '0', zIndex: '1', padding: '0.45em', margin: '0.65em'}}>Go back</button>
        </>
    );
};

export default Html5QrcodePlugin;