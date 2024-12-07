export default function Postcard() {
    const author: string = "Author";
    const recipient: string = "Recipient";
    const message: string = "Message";
    const image = "https://placehold.co/1080x720";
    const date: string = "2021-01-01";
    
    return (
        <div style={{ 
            backgroundImage: `url(${image})`, 
            backgroundSize: 'contain', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            padding: '20px', 
            color: 'white', 
            textShadow: '2px 2px 4px black', 
            height: '720px', // Set constant height
            width: '1080px', // Set constant width to match image size
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
                <p style={{ color: 'white', textShadow: '2px 2px 4px black' }}>{recipient}</p>
            </div>
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
                <p style={{ color: 'white', textShadow: '2px 2px 4px black' }}>{author}</p>
            </div>
            <div style={{ textAlign: 'center', zIndex: 1 }}>
                <p style={{ color: 'white', textShadow: '2px 2px 4px black' }}>{message}</p>
            </div>
            <div style={{ position: 'absolute', bottom: '20px', zIndex: 1 }}>
                <p style={{ color: 'white', textShadow: '2px 2px 4px black' }}><em>{date}</em></p>
            </div>
        </div>
    )
}