// View Problem Here
//
//
// https://www.hackerrank.com/challenges/saveprincess
//
//
//
function processData(input) {
    var lines = input.split('\n');
    var dimension = parseInt(lines[0]);
    var grid = [];
    for(var i = 1; i <= dimension; ++i)
    {
        grid.push(lines[i]);
    }
    displayPathtoPrincess(dimension, grid);
}

function displayPathtoPrincess(dimension, grid)
{
    // Your Code here        
    // Compare x,y differences between grid-points.
    // ex.  peach = [0,0]; you = [0,1]; // y-axis moves up one space    
    
    
    
    if (typeof dimension !== "number" || dimension < 3 || dimension > 100) {throw new Error("Constraints met");}
    
    let peach = "p", bot = "m";
    
    let moves = [];
    let move = {
        UP: function()    { },
        DOWN: function()  { },
        RIGHT: function() { },
        LEFT: function()  { }
    };
    Object.keys(move).forEach((key)=>{
        move[key] = function() { moves.push(key) }
    });
    let AvatarCoords = {
        m: {
            x: Number,
            y: Number
        },
        p: {
            x: Number,
            y: Number
        }
    };
    // array coords originate from topleft to bottomRight
    
    function findAvatar(avatar, grid) {
        // Not the fastest but I'm keeping code seperate.
//         for (var r = 0; r < grid.length; r++) {  
        
//             for (var c = 0; c < grid[r].length; c++) {
                
//                 if (grid[r][c] === avatar) { 
//                     AvatarCoords[avatar].x = c; 
//                     AvatarCoords[avatar].y = r;
//                     c=grid[r].length;
//                     r=grid.length;
//                 } 
//             }
//         }
        
            grid.forEach((row,iR,a)=>{
                
                grid[iR].split("").forEach((val,iV,a)=>{
                    if (val === avatar) { 
                        AvatarCoords[avatar].x = iV; 
                        AvatarCoords[avatar].y = iR;
                    } 
                });
            });
        
            
    }
    function CalculateMoves(avatar1, avatar2) {
        // intending solo-character coords
        
        let xDiff = AvatarCoords[avatar1].x - AvatarCoords[avatar2].x;
        let yDiff = AvatarCoords[avatar1].y - AvatarCoords[avatar2].y;
            
        // x: 012   - = left; + = right
        // y: 012   - = up;   + = bottom
            
        // start with x just because;
        
        for (let horiz = 0; horiz < Math.abs(xDiff); horiz++) { [move.LEFT, move.RIGHT][Number(xDiff < 0)]() }
        for (let vertz = 0; vertz < Math.abs(yDiff); vertz++) { [move.UP,   move.DOWN ][Number(yDiff < 0)]() }
    }
    function printMoves() {
        moves.forEach((e)=>{console.log(e)})
    }
    
    function Main() {
        findAvatar(peach, grid), findAvatar(bot, grid);
        CalculateMoves(bot, peach);
        printMoves();
    } 
    Main();
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";

process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
