import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/services/firestore.service';

export interface Jugador {
  nombre: string;
  puntaje: number;
}

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
})
export class RankComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'puntaje'];
  dataSource = new MatTableDataSource<any>([]);
  data: any[] = [];
  @Input() base: string = '';
  constructor(private firestore: FirestoreService) {}
  ngOnInit(): void {
    this.fetchData(this.base);
  }

  async fetchData(base: string) {
    debugger;

    this.firestore.getData(base, (data) => {
      this.dataSource.data = data;
    });

    console.log(this.dataSource);
  }
}
