import { Page, Card, DataTable,TextStyle } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
function DataTableExample() {
  const [rowdata, setRowData] = useState([]);
  const rows = rowdata;
  async function FetchingData() {
    const tmp = [];
    const gitUser = await fetch('https://api.github.com/users');
    const allUser = await gitUser.json();
    allUser.forEach(user => {
      tmp.push([user.login, user.id, user.avatar_url, user.type, user.url])
    });
    setRowData(tmp);
  }
  useEffect(() => {
    FetchingData();
  }, []);

  return (
    <Page title="Users DataTable">
      <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'text',
            'text',
            'text',
          ]}
          headings={[
            'User Name',
            'Id',
            'User pic',
            'Type',
            'Visit Link',
          ]}
          rows={rows}
        />
      </Card>
    </Page>
  );
}


export default DataTableExample;