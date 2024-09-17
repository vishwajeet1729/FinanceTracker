import { useMemo, useState } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useTable, Column, CellProps } from "react-table";
import { FinancialRecord } from "../../contexts/financial-record-context";
import "./financial-record.css"
interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, coloumnId: string, value: any) => void;
  editable: boolean;
  // deleteRecord: () => void;
}
const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [value, setValue] = useState(initialValue);
 const onBlur=()=>{
       setIsEditing(false);
       updateRecord(row.index,column.id,value);
 }      
  return (
    <div onClick={() => editable && setIsEditing(true)} style={{cursor:editable?"pointer":"default"}}>
      
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          style={{ width: "100%" }}
          onBlur={onBlur}
        />
      ) : typeof value == "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};
export const FinancialRecordList = () => {
  const { records ,updateRecord,deleteRecord} = useFinancialRecords();
  
       
  const updateCellRecord=(rowIndex:number,columnId:string,value:any)=>{
         const id=records[rowIndex]._id;
         updateRecord(id??"",{...records[rowIndex],[columnId]:value})
  }
 

  const columns: Array<Column<FinancialRecord>> = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        )
      },
      {
        Header: "Amount",
        accessor: "amount",
        cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        )
      },
      {
        Header: "Category",
        accessor: "category",
        cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        )
      },
      {
        Header: "payment Method",
        accessor: "paymentMethod",
        cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        )
      },
      {
        Header: "Date",
        accessor: "date",
        cell: (props) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={false} />
        )
      },
       
      {
        Header: "Delete",
        id: "delete",
        cell: (row) => (
              <button onClick={()=>deleteRecord(row.row.original._id)} className="button">Delete</button>     
        )
      }
    
    ],
    [records]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: records });

  return (
    <div className="table-container">
      <table className="table-container" {...getTableProps()}>
        <thead>
         
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((coloum) => (
                <th {...coloum.getHeaderProps()}>{coloum.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
