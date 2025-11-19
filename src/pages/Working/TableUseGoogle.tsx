import React from "react";
import Table from "../../components/rnd/Table";

const TableUseGoogle: React.FC = () => {
  const headers = ["ID", "Name", "Age", "Email"];
  const rows = [
    ["1", "John Doe", "28", "john.doe@example.com"],
    ["2", "Jane Smith", "34", "jane.smith@example.com"],
    ["3", "Sam Green", "22", "sam.green@example.com"],
    ["4", "Alice Brown", "45", "alice.brown@example.com"],
    ["5", "Bob White", "30", "bob.white@example.com"],
    ["6", "Charlie Black", "29", "charlie.black@example.com"],
    ["7", "Diana Blue", "33", "diana.blue@example.com"],
    ["8", "Eve Yellow", "27", "eve.yellow@example.com"],
    ["9", "Frank Red", "40", "frank.red@example.com"],
    ["10", "Grace Pink", "25", "grace.pink@example.com"],
    ["11", "Henry Gray", "35", "henry.gray@example.com"],
    ["12", "Ivy Orange", "31", "ivy.orange@example.com"],
    ["1", "John Doe", "28", "john.doe@example.com"],
    ["2", "Jane Smith", "34", "jane.smith@example.com"],
    ["3", "Sam Green", "22", "sam.green@example.com"],
    ["4", "Alice Brown", "45", "alice.brown@example.com"],
    ["5", "Bob White", "30", "bob.white@example.com"],
    ["6", "Charlie Black", "29", "charlie.black@example.com"],
    ["7", "Diana Blue", "33", "diana.blue@example.com"],
    ["8", "Eve Yellow", "27", "eve.yellow@example.com"],
    ["9", "Frank Red", "40", "frank.red@example.com"],
    ["10", "Grace Pink", "25", "grace.pink@example.com"],
    ["11", "Henry Gray", "35", "henry.gray@example.com"],
    ["12", "Ivy Orange", "31", "ivy.orange@example.com"],
    ["1", "John Doe", "28", "john.doe@example.com"],
    ["2", "Jane Smith", "34", "jane.smith@example.com"],
    ["3", "Sam Green", "22", "sam.green@example.com"],
    ["4", "Alice Brown", "45", "alice.brown@example.com"],
    ["5", "Bob White", "30", "bob.white@example.com"],
    ["6", "Charlie Black", "29", "charlie.black@example.com"],
    ["7", "Diana Blue", "33", "diana.blue@example.com"],
    ["8", "Eve Yellow", "27", "eve.yellow@example.com"],
    ["9", "Frank Red", "40", "frank.red@example.com"],
    ["10", "Grace Pink", "25", "grace.pink@example.com"],
    ["11", "Henry Gray", "35", "henry.gray@example.com"],
    ["12", "Ivy Orange", "31", "ivy.orange@example.com"],
    ["1", "John Doe", "28", "john.doe@example.com"],
    ["2", "Jane Smith", "34", "jane.smith@example.com"],
    ["3", "Sam Green", "22", "sam.green@example.com"],
    ["4", "Alice Brown", "45", "alice.brown@example.com"],
    ["5", "Bob White", "30", "bob.white@example.com"],
    ["6", "Charlie Black", "29", "charlie.black@example.com"],
    ["7", "Diana Blue", "33", "diana.blue@example.com"],
    ["8", "Eve Yellow", "27", "eve.yellow@example.com"],
    ["9", "Frank Red", "40", "frank.red@example.com"],
    ["10", "Grace Pink", "25", "grace.pink@example.com"],
    ["11", "Henry Gray", "35", "henry.gray@example.com"],
    ["12", "Ivy Orange", "31", "ivy.orange@example.com"],
    ["1", "John Doe", "28", "john.doe@example.com"],
    ["2", "Jane Smith", "34", "jane.smith@example.com"],
    ["3", "Sam Green", "22", "sam.green@example.com"],
    ["4", "Alice Brown", "45", "alice.brown@example.com"],
    ["5", "Bob White", "30", "bob.white@example.com"],
    ["6", "Charlie Black", "29", "charlie.black@example.com"],
    ["7", "Diana Blue", "33", "diana.blue@example.com"],
    ["8", "Eve Yellow", "27", "eve.yellow@example.com"],
    ["9", "Frank Red", "40", "frank.red@example.com"],
    ["10", "Grace Pink", "25", "grace.pink@example.com"],
    ["11", "Henry Gray", "35", "henry.gray@example.com"],
    ["12", "Ivy Orange", "31", "ivy.orange@example.com"],
    ["1", "John Doe", "28", "john.doe@example.com"],
    ["2", "Jane Smith", "34", "jane.smith@example.com"],
    ["3", "Sam Green", "22", "sam.green@example.com"],
    ["4", "Alice Brown", "45", "alice.brown@example.com"],
    ["5", "Bob White", "30", "bob.white@example.com"],
    ["6", "Charlie Black", "29", "charlie.black@example.com"],
    ["7", "Diana Blue", "33", "diana.blue@example.com"],
    ["8", "Eve Yellow", "27", "eve.yellow@example.com"],
    ["9", "Frank Red", "40", "frank.red@example.com"],
    ["10", "Grace Pink", "25", "grace.pink@example.com"],
    ["11", "Henry Gray", "35", "henry.gray@example.com"],
    ["12", "Ivy Orange", "31", "ivy.orange@example.com"],

    ["1", "John Doe", "28", "john.doe@example.com"],
    ["2", "Jane Smith", "34", "jane.smith@example.com"],
    ["3", "Sam Green", "22", "sam.green@example.com"],
    ["4", "Alice Brown", "45", "alice.brown@example.com"],
    ["5", "Bob White", "30", "bob.white@example.com"],
    ["6", "Charlie Black", "29", "charlie.black@example.com"],
    ["7", "Diana Blue", "33", "diana.blue@example.com"],
    ["8", "Eve Yellow", "27", "eve.yellow@example.com"],
    ["9", "Frank Red", "40", "frank.red@example.com"],
    ["10", "Grace Pink", "25", "grace.pink@example.com"],
    ["11", "Henry Gray", "35", "henry.gray@example.com"],
    ["12", "Ivy Orange", "31", "ivy.orange@example.com"],
  ];

  return (
    <div className="">
      <Table
        headers={headers}
        rows={rows}
        pagination={true}
        rowsPerPage={5}
        searchable={true}
        className="border border-gray-200 rounded-lg"
        rowClassName="hover:bg-gray-50"
        paginationType = "google"
      />
    </div>
  );
};

export default TableUseGoogle;