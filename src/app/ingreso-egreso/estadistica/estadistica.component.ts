import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ChartConfiguration } from 'chart.js';
import { AppStateWhitInOut } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  egresos: number = 0;
  totalEgresos: number = 0;
  totalIngresos: number = 0;

  public doughnutChartLabels: string[] = ['Egresos', 'Ingresos'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [], label: 'Series A' }];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };
  constructor(private store: Store<AppStateWhitInOut>) {}

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.generarEstadistica(items);
    });
  }

  generarEstadistica(items: any[]) {
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartDatasets = [
      { data: [this.totalEgresos, this.totalIngresos], label: 'Series A' },
    ];
  }
}
