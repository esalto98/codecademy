const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
  constructor(fieldArr){
    this.field = fieldArr;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;
    
  }

  runGame(){
    let playing = true;
      while (playing) {
          this.print();
          this.askMove();
          if (!this.isInBounds())
          {
              console.log('Out of bounds instruction!')
              playing = false;
              break;
          } else if(this.field[this.locationY][this.locationX] === hole) {
              console.log('oops you fell in a hole!')
              playing = false;
              break;
          } else if (this.field[this.locationY][this.locationX] === hat) {
              console.log('You found the hat, you win!!')
              playing = false;
              break;
          }
          //keep moving if valid move and no hole or hat, mark with a path char to show move
          this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  askMove() {
  const move = prompt('Which way?').toUpperCase();
  switch(move){
      case 'U':
          this.locationY -= 1;
          break;
      case 'D':
          this.locationY += 1;
          break;
      case 'L':
          this.locationX -= 1;
          break;
      case 'R':
          this.locationX += 1;
          break;
      default:
          console.log('Enter U, D, L or R');
          this.askMove();
          break; 
  }
  }
    
    isInBounds() {
        const rowMax = this.field[0].length;
        const colMax = this.field.length;
        
        return this.locationX >= 0 && this.locationX < rowMax && this.locationY >= 0 && this.locationY < colMax;
    }

    print() {
        const displayString = this.field.map(row => {
        return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(() => new Array(width).fill(0));
        //fill matrix with 0 and make matrix by provided dimensions
        for (let y = 0; y < height; ++y){
            for (let x = 0; x < width; ++x){
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

        //add hat in matrix randomly 
        field[Math.floor(Math.random()+1 * height-1)][Math.floor(Math.random()+1 * width-1)] = hat;
        return field;
    }  
}

const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.runGame();
