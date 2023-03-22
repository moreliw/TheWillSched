import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-product-stock-list',
  templateUrl: './product-stock-list.component.html',
  styleUrls: ['./product-stock-list.component.scss'],
})
export class ProductStockListComponent implements OnInit {
  ngOnInit(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const SPEED = 2;
    const triangle = document.getElementById('triangle')!;
    let x = 10;
    let y = 350;
    // Função para desenhar o triângulo na tela
    function drawTriangle() {
      triangle.style.left = `${x}px`;
      triangle.style.top = `${y}px`;
    }

    // Função para atualizar a posição do triângulo
    function updateTriangle() {
      x += SPEED;
      y -= SPEED;
      if (x > 350) {
        x = 10;
        y = 350;
      }
    }

    // Função principal que será chamada a cada frame
    function gameLoop() {
      // Limpar a tela
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Desenhar o triângulo
      drawTriangle();

      // Atualizar a posição do triângulo
      updateTriangle();

      // Chamar a função novamente no próximo frame
      requestAnimationFrame(gameLoop);
    }

    // Iniciar o loop do jogo
    gameLoop();
  }

  data = [
    { column1: 'value1', column2: 'value2' },
    { column1: 'value3', column2: 'value4' },
  ];
  dataTable: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  test() {
    console.log('treste');
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
