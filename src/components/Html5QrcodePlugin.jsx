// file = Html5QrcodePlugin.jsx
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect } from 'react';
const qrcodeRegionId = "reader";

const Html5QrcodePlugin = ({resultFromScan, removeScanner}) => {
    useEffect(() => {
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

                    html5QrCode.stop().then((ignore) => {
                        resultFromScan(decodedText);
                        removeScanner(false)

                    }).catch((err) => {
                        // Stop failed, handle it.
                    });
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

                    });
                });

            }
        }).catch(err => {
            // handle err
        });
    }, []);

    return (
        <>
            <div id={qrcodeRegionId} style={{height: '100%', backgroundColor: 'blue', display: 'flex', flexDirection: 'column', justifyContent: 'center'} } > </div>
            <button id='goBack' style={{position: 'fixed', left: '0', top: '0', zIndex: '1', padding: '0.45em', margin: '0.65em'}}>Go back</button>
        </>
    );
};

export default Html5QrcodePlugin;