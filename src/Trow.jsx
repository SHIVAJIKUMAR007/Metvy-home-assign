import React from "react";

//one row of the table
const Trow = ({ row, index, setData, selectMulti, setallSelected }) => {
  //approve one
  const approveOne = () => {
    const con = window.confirm(
      `Are you sure, confirming ${row.mobile}'s earning`
    );
    if (con) {
      console.log([{ ...row, action: "Approved" }]);
      setData((pre) => {
        return pre.map((pre, i) => {
          if (index === i) pre.action = "Approved";
          return pre;
        });
      });
    }
  };
  //reject one
  const reject = () => {
    const remark = window.prompt(
      `Are you sure, rejecting ${row.mobile}'s earning.\nWrite a remark.`
    );
    if (remark) {
      console.log([{ ...row, action: "reject", remark: remark }]);
      setData((pre) => {
        return pre.map((pre, i) => {
          if (index === i) {
            pre.action = "Reject";
            pre.remark = remark;
          }
          return pre;
        });
      });
    } else {
      window.alert("Cann't reject without remark.");
    }
  };
  //select the non selected one and remove the selected one on user demand
  const selectIt = () => {
    const checkbox = document.getElementById(`checkbox${index}`);
    if (checkbox.checked) {
      setallSelected((pre) => [...pre, index]);
    } else {
      setallSelected((pre) => {
        pre = pre.filter((x) => x !== index);
        return pre;
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          {selectMulti && row.action === "NotReviewed" ? (
            <input type="checkbox" id={`checkbox${index}`} onClick={selectIt} />
          ) : null}
          {"  " + row.mobile}
        </td>
        <td>{row.earning_id}</td>
        <td>{row.earning}</td>
        <td>
          {row.action === "NotReviewed" ? (
            <>
              <button className="btn btn-transparent" onClick={approveOne}>
                Approve
              </button>{" "}
              |{" "}
              <button className="btn btn-transparent" onClick={reject}>
                Reject
              </button>
            </>
          ) : row.action === "Approved" ? (
            <p> aprooved</p>
          ) : (
            <p>Rejected ( {row.remark} )</p>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Trow;
