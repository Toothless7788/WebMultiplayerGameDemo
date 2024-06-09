enum Direction {
    UP, 
    DOWN, 
    LEFT, 
    RIGHT, 
    NONE
}

type Player = {
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    color: string, 
    direction: Direction
}