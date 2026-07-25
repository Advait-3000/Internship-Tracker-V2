import React from "react";
import Table from "../../ui/Table";
import EmptyState from "../../ui/EmptyState";
import Loader from "../../ui/Loader";

const DataTable = ({ headers = [], data = [], renderRow, isLoading = false, emptyText = "No data available" }) => {
  if (isLoading) return <Loader text="Loading data..." />;
  if (!data || data.length === 0) return <EmptyState title={emptyText} />;

  return (
    <Table headers={headers}>
      {data.map((item, idx) => (
        <tr key={item.id || idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          {renderRow(item, idx)}
        </tr>
      ))}
    </Table>
  );
};

export default DataTable;
