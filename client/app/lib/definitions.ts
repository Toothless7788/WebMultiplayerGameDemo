/*
Should be put in the backend but since we are using JavaScript, this script becomes useless
*/
export enum Direction {
    UP, 
    DOWN, 
    LEFT, 
    RIGHT, 
    NONE
}

export type PlayerType = {
    x: number,    // The x-coordinate of the centre of the block
    y: number,    // The y-coordinate of the centre of the block
    width: number, 
    height: number, 
    color: string, 
    direction: Direction
}

export type Obstacle = {
    x: number,    // The x-coordinate of the centre of the block
    y: number,    // The y-coordinate of the centre of the block
    width: number, 
    height: number,    
    color: string
}