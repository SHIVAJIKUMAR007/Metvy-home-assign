import React, { useEffect, useState } from "react";
import { csv } from "d3";
import pts from "./parse_test_sheet.csv";
import Trow from "./Trow";

//table component
function Table() {
  const [data, setdata] = useState([]);
  const [selectMulti, setselectMulti] = useState(0);
  const [allSelected, setallSelected] = useState([]);

  //load data from csv file
  useEffect(() => {
    csv(pts).then((data) => {
      const data2 = data.map((d) => {
        d.action = "NotReviewed";
        return d;
      });
      setdata(data2);
    });
  }, []);

  //approval to all selected
  const approveAll = () => {
    const con = window.confirm(`Are you sure, confirming all selected earning`);
    if (con) {
      //set all approved data action
      setdata((pre) => {
        pre = pre.map((item, i) => {
          if (allSelected.indexOf(i) !== -1) {
            item.action = "Approved";
          }
          return item;
        });
        return pre;
      });
      //get data to log or all data which approved
      let dataToLog = [];
      data.forEach((item, i) => {
        if (allSelected.includes(i)) {
          dataToLog = [...dataToLog, item];
        }
      });
      setallSelected([]);
      setselectMulti(0);
      console.log(dataToLog); //log all approved data
    }
  };
  return (
    <div className="container">
      <h2 className="mt-3">New Earnings</h2>

      <button
        className="mt-4 ml-5 btn btn-success"
        onClick={() => setselectMulti((pre) => (pre === 1 ? 0 : 1))}
      >
        Select Multiple
      </button>

      <table className="mt-4 table">
        <thead className="table-dark">
          <tr>
            <th scope="col">mobile</th>
            <th scope="col">id</th>
            <th scope="col">earning</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        {data?.map((d, i) => (
          <Trow
            key={i}
            index={i}
            row={d}
            setData={setdata}
            selectMulti={selectMulti}
            setallSelected={setallSelected}
          />
        ))}
      </table>

      {allSelected.length ? (
        <button className="btn btn-success mt-2" onClick={approveAll}>
          Approve all
        </button>
      ) : null}
    </div>
  );
}

export default Table;
