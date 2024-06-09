enum Direction {
    UP, 
    DOWN, 
    LEFT, 
    RIGHT, 
    NONE
}

type Player = {
    x: number,    // The x-coordinate of the centre of the block
    y: number,    // The y-coordinate of the centre of the block
    width: number, 
    height: number, 
    color: string, 
    direction: Direction
}

type Obstacle = {
    x: number,    // The x-coordinate of the centre of the block
    y: number,    // The y-coordinate of the centre of the block
    width: number, 
    height: number,    
    color: string
}