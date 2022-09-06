import {
    ChoiceList,
    TextField,
    RangeSlider,
    Card,
    ResourceList,
    Filters,
    Avatar,
    TextStyle,
    Stack,
    Badge,
    Button,
    Modal,
    TextContainer
} from '@shopify/polaris';
import { Page, Grid } from '@shopify/polaris';
import { type } from '@testing-library/user-event/dist/type';
import { useState, useEffect, useCallback } from 'react';

function FilterData() {
    const [rowdata, setRowData] = useState([]);
    const allGitData = []
    const [accountStatus, setAccountStatus] = useState(null);
    const [moneySpent, setMoneySpent] = useState(null);
    const [taggedWith, setTaggedWith] = useState(null);
    const [queryValue, setQueryValue] = useState(null);
    const [active, setActive] = useState(false);
    // if (accountStatus == 'enabled') {
    //     alert(accountStatus+" Account Status Enabled..!")
    // }
    // if (accountStatus == 'not invited') {
    //     alert(accountStatus+" Account Status Not Invited..!")
    // }
    // if (accountStatus == 'invited') {
    //     alert(accountStatus+" Account Status Invited..!")
    // }
    // if (accountStatus == 'declined') {
    //     alert(accountStatus+" Account Status Declined..!")
    // }
    // if(taggedWith){
    //     console.log(taggedWith, "am taggedWith");
    // }




    const handleAccountStatusChange = useCallback(
        (value) => setAccountStatus(value),
        [],
    );
    const handleMoneySpentChange = useCallback(
        (value) => setMoneySpent(value),
        [],
    );
    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        [],
    );
    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );
    const handleAccountStatusRemove = useCallback(
        () => setAccountStatus(null),
        [],
    );
    const handleChange = useCallback(() => setActive(!active), [active]);

    const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
    const handleFiltersClearAll = useCallback(() => {
        handleAccountStatusRemove();
        handleMoneySpentRemove();
        handleTaggedWithRemove();
        handleQueryValueRemove();
        handleChange();
    }, [
        handleAccountStatusRemove,
        handleMoneySpentRemove,
        handleQueryValueRemove,
        handleTaggedWithRemove,
        handleChange,
    ]);

    const filters = [
        {
            key: 'accountStatus',
            label: 'Account status',
            filter: (
                <ChoiceList
                    title="Account status"
                    titleHidden
                    choices={[
                        { label: 'Enabled', value: 'enabled' },
                        { label: 'Not invited', value: 'not invited' },
                        { label: 'Invited', value: 'invited' },
                        { label: 'Declined', value: 'declined' },
                    ]}
                    selected={accountStatus || []}
                    onChange={handleAccountStatusChange}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
        {
            key: 'taggedWith',
            label: 'Tagged with',
            filter: (
                <TextField
                    label="Tagged with"
                    value={taggedWith}
                    onChange={handleTaggedWithChange}
                    autoComplete="off"
                    labelHidden
                />
            ),
            shortcut: true,
        },
        {
            key: 'moneySpent',
            label: 'Money spent',
            filter: (
                <RangeSlider
                    label="Money spent is between"
                    labelHidden
                    value={moneySpent || [0, 500]}
                    prefix="$"
                    output
                    min={0}
                    max={2000}
                    step={1}
                    onChange={handleMoneySpentChange}
                />
            ),
        },
    ];

    const appliedFilters = [];
    if (!isEmpty(accountStatus)) {
        const key = 'accountStatus';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, accountStatus),
            onRemove: handleAccountStatusRemove,
        });
    }
    if (!isEmpty(moneySpent)) {
        const key = 'moneySpent';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, moneySpent),
            onRemove: handleMoneySpentRemove,
        });
    }
    if (!isEmpty(taggedWith)) {
        const key = 'taggedWith';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, taggedWith),
            onRemove: handleTaggedWithRemove,
        });
    }
    // fetching data
    async function gitData() {
        const tmp = [];
        const gitUser = await fetch('https://api.github.com/users');
        const allgitUser = await gitUser.json();

        allgitUser.forEach(user => {
            if (queryValue == user.login) {
                tmp.push({
                    id: user.id,
                    name: user.login,
                    userPic: user.avatar_url,
                    userUrl: user.html_url,
                    userType: user.type,
                });
            }
        });
        allGitData.push(allgitUser)
        setRowData(tmp);
    }
    useEffect(() => {
        gitData();
    });
    return (
        <Page title="Filters" fullWidth>
            <Grid columns={{ sm: 3 }}>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 12, xl: 12 }}>
                    <div style={{ height: '200px' }}>
                        <Card>
                            <ResourceList
                                resourceName={{ singular: 'customer', plural: 'customers' }}
                                filterControl={
                                    <Filters
                                        queryValue={queryValue}
                                        filters={filters}
                                        appliedFilters={appliedFilters}
                                        onQueryChange={handleFiltersQueryChange}
                                        onQueryClear={handleQueryValueRemove}
                                        onClearAll={handleFiltersClearAll}
                                    />
                                }

                                items={rowdata}
                                // {[
                                //     {
                                //         id: 341,
                                //         url: 'customers/341',
                                //         name: 'Mae Jemison',
                                //         location: 'Decatur, USA',
                                //     },
                                //     {
                                //         id: 256,
                                //         url: 'customers/256',
                                //         name: 'Ellen Ochoa',
                                //         location: 'Los Angeles, USA',
                                //     },
                                // ]}
                                renderItem={(item) => {
                                    const { id, name, userPic, userUrl, userType } = item;
                                    const media = <Avatar customer size="medium" source={userPic} name={name} />;
                                    return (
                                        <ResourceList.Item
                                            id={id}
                                            user={userPic}
                                            // url={userUrl}
                                            media={media}
                                            accessibilityLabel={`View details for ${name}`}
                                            onClick={handleChange}
                                        >
                                            <h3>
                                                <TextStyle username={name} variation="strong">{name}</TextStyle>
                                                <span>
                                                    <Stack>
                                                        <Badge>{userType}</Badge>
                                                    </Stack>
                                                </span>
                                                <span>{userUrl}</span>
                                            </h3>
                                            <div style={{ height: '50px' }}>
                                                <Modal
                                                    activator={Filters}
                                                    open={active}
                                                    onClose={handleChange}
                                                    title="Received user via github."
                                                >
                                                    <Modal.Section>
                                                        <TextContainer>
                                                            <Grid>
                                                                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 6 }}>
                                                                    <div sectioned>
                                                                        <img src={userPic} style={{ height: "150px", borderRadius: "50%" }} name={name} />
                                                                    </div>
                                                                </Grid.Cell>
                                                                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 4, xl: 6 }}>
                                                                    <div title="Profile" sectioned>
                                                                        <div style={{ marginTop: "20px" }}>
                                                                            <div style={{ fontSize: "25px" }}>ID
                                                                                <span style={{ fontSize: "25px", marginLeft: "12px" }}><b>{id}</b></span>
                                                                            </div>
                                                                            <div style={{ marginTop: "13px" }}>
                                                                                <span style={{ fontSize: "25px" }}>{userType}</span>
                                                                                <span style={{ fontSize: "25px", marginLeft: "12px" }}><b>{name}</b></span>
                                                                            </div>
                                                                            <div style={{ marginTop: "16px" }}>
                                                                            <Button size="slim" url={userUrl}>View Profile</Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Grid.Cell>
                                                            </Grid>
                                                            <p>                                                       
                                                                Use GitHub posts to share your products with millions of
                                                                people. Let shoppers buy from your store without leaving
                                                                Github.
                                                            </p>
                                                        </TextContainer>
                                                    </Modal.Section>
                                                </Modal>
                                            </div>

                                        </ResourceList.Item>

                                    );
                                }}
                            />
                        </Card>
                    </div>
                </Grid.Cell>
            </Grid>
        </Page >
    );

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'moneySpent':
                return `Money spent is between $${value[0]} and $${value[1]}`;
            case 'taggedWith':
                return `Tagged with ${value}`;
            case 'accountStatus':
                return value.map((val) => `Customer ${val}`).join(', ');
            default:
                return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
}

export default FilterData;