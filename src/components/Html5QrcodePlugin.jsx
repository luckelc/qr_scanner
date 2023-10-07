// file = Html5QrcodePlugin.jsx
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect } from 'react';
const qrcodeRegionId = "reader";

const Html5QrcodePlugin = ({resultFromScan}) => {

    useEffect(() => {
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
                var cameraId = devices[0].id;
                const html5QrCode = new Html5Qrcode("reader");
                html5QrCode.start(
                cameraId, 
                {
                    fps: 10,    // Optional, frame per seconds for qr code scanning
                },
                (decodedText, decodedResult) => {

                    html5QrCode.stop().then((ignore) => {
                        resultFromScan(decodedText);

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
            }
        }).catch(err => {
            // handle err
        });
    }, []);

    return (
        <div id={qrcodeRegionId} style={{height: '100%', backgroundColor: 'blue', display: 'flex', flexDirection: 'column', justifyContent: 'center'} } />
    );
};

export default Html5QrcodePlugin;