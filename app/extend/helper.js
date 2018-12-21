'use strict';

const Excel = require('exceljs');
/**
 * Created by Boyce on 18/8/30.
 */
module.exports = {
  isCurrentDay(date) {
    const currentDate = this.getCurrentDate();
    return date.year === currentDate.year &&
            date.month === currentDate.month &&
            date.day === currentDate.day;
  },

  getDateDetail(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return { year, month, day };
  },

  getCurrentDate() {
    const date = new Date();
    return this.getDateDetail(date);
  },

  getCurrentWeek() {
    const date = new Date();
    const week = date.getDay();
    const millisecond = 1000 * 60 * 60 * 24;
    const minusDay = week !== 0 ? week - 1 : 6;
    const result = [];
    const monday = new Date(date.getTime() - (minusDay * millisecond));
    result.push(this.getDateDetail(monday));
    for (let i = 1; i <= 6; i++) {
      result.push(this.getDateDetail(new Date(monday.getTime() + i * millisecond)));
    }
    return result;
  },

  async excelExport(name, headers, rows) {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('My Sheet', { views: [{ xSplit: 1, ySplit: 1 }] });
    sheet.columns = headers;
    sheet.addRows(rows);

    this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.ctx.set('Content-Disposition', 'attachment; filename=' + name + '.xlsx');
    this.ctx.body = await workbook.xlsx.writeBuffer();
  },
};

