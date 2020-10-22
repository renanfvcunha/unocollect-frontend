import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const defs = (formTitle: string, data: string[][]): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: formTitle,
        alignment: 'center',
        margin: [0, 0, 0, 16],
        fontSize: 16,
        bold: true,
      },
      {
        layout: 'lightHorizontalLines',
        fontSize: 10,
        table: {
          headerRows: 1,
          body: data,
        },
      },
    ],
  };

  return docDefinition;
};

export default defs;
