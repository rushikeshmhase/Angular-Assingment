import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AssociateService } from 'src/app/shared/associate.service';
import { read, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-associatelist',
  templateUrl: './associatelist.component.html',
  styleUrls: ['./associatelist.component.css']
})
export class AssociatelistComponent {
  constructor(private http: HttpClient, private service: AssociateService) {}

  associate: any[] = [];
  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.associate = rows;

          this.service.UploadExcel(files).subscribe();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  handleExport() {
    const headings = [
      [
        'S.No',
        'EmpId',
        'Name',
        'Grade',
        'TrainingName',
        'StartDate',
        'EndDate',
        'AveragePercentage',
        'Score',
        'TrainingFeedback',
        'Remarks',
        'Edit',
      ],
    ];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.associate, {
      origin: 'A2',
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Associate List Report.xlsx');
  }

}
