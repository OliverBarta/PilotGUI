import './assets/WindowArea.css'


function WindowArea({ numWindows }) {
    const cols = numWindows <= 2 ? numWindows : numWindows / 2;


    return (
        <div className="windowArea" style={{ '--cols': cols }}>
            {Array.from({ length: numWindows }, (_, index) => (
            <div key={index} className="window">
                Window {index + 1}
            </div>
            ))}
        </div>
    )
}

export default WindowArea;