
export default function Block({x, y, width, height, color}: {x: number, y: number, width: number, height: number, color: string}) {
    // CSS takes the bottom-left corer of the block as coordinates
    let displayX = x - width / 2;
    let displayY = y - height / 2;

    return (
        <div className="absolute rounded-xl"
        style={{
            bottom: displayY, 
            left: displayX, 
            width: width, 
            height: height, 
            backgroundColor: color
        }} />
    );
}