import { Injectable } from '@angular/core';
import {AllCalculatedData} from '../data/model/implementations/for-xlsx/all-calculated-data';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class Excel {

  onExportCalibrationPointRadiusResults(allCalcData: AllCalculatedData | null) {
    if (!allCalcData) return;

    const dataForCalc = allCalcData.dataForCalc;
    const calibrRadiusList = allCalcData.calibrationPointsRadiusList;

    if (!dataForCalc) return;
    if (!calibrRadiusList) return;

    const data = [
      ['Параметр', 'Значение', 'Ед. измерения'],
      ['Входные данные:', '', ''],
      ['Ширина лопаточного паза диска', dataForCalc?.widthOfBladeSlot, 'мм.'],
      ['Наименьшая ширина хвостовика лопатки', dataForCalc?.minWidthOfBladeShank, 'мм.'],
      ['Наибольшая ширина хвостовика лопатки', dataForCalc?.maxWidthOfBladeShank, 'мм.'],
      ['Наибольшая высота рабочей лопатки по входной кромке', dataForCalc?.maxHeightOfWorkingBladeAtLeadingEdge, 'мм.'],
      ['Наименьшая высота рабочей лопатки по входной кромке', dataForCalc?.minHeightOfWorkingBladeAtLeadingEdge, 'мм.'],
      ['Наибольшая высота рабочей лопатки по выходной кромке', dataForCalc?.maxHeightOfWorkingBladeAtTrailingEdge, 'мм.'],
      ['Наименьшая высота рабочей лопатки по выходной кромке', dataForCalc?.minHeightOfWorkingBladeAtTrailingEdge, 'мм.'],
      //todo градусы или радианы?
      ['Половина угла лопаточного паза диска (a)', dataForCalc.a, 'градусы/радианы?'],
      ['Радиус расположения паспортной ширины лопаточного паза диска (R)', dataForCalc.stepValue, 'мм.'],
      ['', '', ''],
      ['Результаты расчетов:', '', ''],
      ['R max вх.', calibrRadiusList[0].value, 'мм.'],
      ['R min вх.', calibrRadiusList[1].value, 'мм.'],
      ['R max вых.', calibrRadiusList[2].value, 'мм.'],
      ['R min вых.', calibrRadiusList[3].value, 'мм.'],
    ]

    // Создание рабочей книги и листа
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Ширина ячеек A,B,C
    worksheet['!cols'] = [
      { wch: 65 },
      { wch: 10 },
      { wch: 15 },
    ];

    // Создание раб книги и добавление листа
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Лист результата');

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Выгрузка файла
    XLSX.writeFile(workbook, `Результат расчета радиусов калибровых точек по торцам рабочих лопаток ротора КВД` +
      ` ${day}.${month}.${year} ${hours}-${minutes}-${seconds}.xlsx`);
  }
}
