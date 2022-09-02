import {
    IndexTable,
    TextStyle,
    Card,
    Page,
    useIndexResourceState,
} from '@shopify/polaris';
import { useState, useEffect } from 'react';
import React from 'react';

function SimpleIndexTableExample() {
    const [rowdata, setRowData] = useState([]);
    const allGitData = []
    async function gitData() {
        const tmp = [];
        const gitUser = await fetch('https://api.github.com/users');
        const allgitUser = await gitUser.json();
        allgitUser.forEach(user => {
            tmp.push({
                id: user.id,
                name: user.login,
                userPic: user.avatar_url,
                userUrl: user.url,
                userType: user.type,

            })
        });
        allGitData.push(allgitUser)
        setRowData(tmp);
        console.log(tmp, "data type");
    }
    useEffect(() => {
        gitData();
    }, []);
    const customers = rowdata;
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(customers);

    const rowMarkup = customers.map(
        ({ id, name, userPic, userType, userUrl }, index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <TextStyle variation="strong">{name}</TextStyle>
                </IndexTable.Cell>
                <IndexTable.Cell>{id}</IndexTable.Cell>
                <IndexTable.Cell>{userPic}</IndexTable.Cell>
                <IndexTable.Cell>{userType}</IndexTable.Cell>
                <IndexTable.Cell>{userUrl}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    return (
        <Page fullWidth>
            <TextStyle variation="strong">Index Table</TextStyle>
            <Card>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={customers.length}
                    selectedItemsCount={
                        allResourcesSelected ? 'All' : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        { title: 'User Name' },
                        { title: 'ID' },
                        { title: 'User Pic' },
                        { title: 'type' },
                        { title: 'Visit Link' }
                    ]}
                >
                    {rowMarkup}
                </IndexTable>
            </Card>
        </Page>
    );
}

export default SimpleIndexTableExample;