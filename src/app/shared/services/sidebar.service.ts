import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  getActiveMenu(): Observable<Response<Menu[]>> {
      const menus: Menu[] = [
        { link_name: 'Dashboard', tooltip: 'Dashboard', path: '', icon: 'bx-grid-alt', active: false },
        { link_name: 'Loja', tooltip: 'Loja', path: 'store', icon: 'bx-store', active: true },
        { link_name: 'Carrinho', tooltip: 'Carrinho', path: 'cart', icon: 'bx-cart', active: true },
        { link_name: 'Messages', tooltip: 'Messages', path: '', icon: 'bx-chat', active: false },
        { link_name: 'Analytics', tooltip: 'Analytics', path: '', icon: 'bx-pie-chart-alt-2', active: false },
        { link_name: 'File Manager', tooltip: 'File Manager', path: '', icon: 'bx-folder', active: false },
        { link_name: 'Order', tooltip: 'Order', path: '', icon: 'bx-cart-alt', active: false },
        { link_name: 'Saved', tooltip: 'Saved', path: '', icon: 'bx-heart', active: false },
        { link_name: 'Settings', tooltip: 'Settings', path: '', icon: 'bx-cog', active: false },
        { link_name: 'Componentes', tooltip: 'Componentes', path: 'components', icon: 'bx-cube', active: true },
        { link_name: 'Jogo de Memória', tooltip: 'Jogo de Memória', path: 'memory-game', icon: 'bx-cube', active: true },
      ]

      return of({data: menus.filter(menu => menu.active)})
  }
}
