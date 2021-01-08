'use strict';

//import react and reactDom for browser rendering
import React from 'react';
import ReactDom from 'react-dom';

import Moment from 'moment';

//import the react-json-view component (installed with npm)
import JsonViewer from './../../src/js/index';

//render 2 different examples of the react-json-view component
ReactDom.render(
    <div>
        {/* just pass in your JSON to the src attribute */}
        <JsonViewer
            sortKeys
            style={{ padding: '30px', backgroundColor: 'white' }}
            src={getExampleJson1()}
            collapseStringsAfterLength={12}
            onEdit={e => {
                console.log('edit callback', e);
                if (e.new_value == 'error') {
                    return false;
                }
            }}
            onDelete={e => {
                console.log('delete callback', e);
            }}
            onAdd={e => {
                console.log('add callback', e);
                if (e.new_value == 'error') {
                    return false;
                }
            }}
            onSelect={e => {
                console.log('select callback', e);
                console.log(e.namespace);
            }}
            displayObjectSize={false}
            name={'dev-server'}
            enableClipboard={false}
            shouldCollapse={({ src, namespace, type }) => {
                if (type === 'array' && src.indexOf('test') > -1) {
                    return true;
                } else if (namespace.indexOf('moment') > -1) {
                    return true;
                }
                return false;
            }}
            defaultValue=""
            displayDataTypes={false}
            displaySearch={true}
        />

    </div>,
    document.getElementById('app-container')
);

/*-------------------------------------------------------------------------*/
/*     the following functions just contain test json data for display     */
/*-------------------------------------------------------------------------*/

//just a function to get an example JSON object
function getExampleJson1() {
    return {
        string: 'this is a test string',
        integer: 42,
        empty_array: [],
        empty_object: {},
        array: [1, 2, 3, 'test'],
        float: -2.757,
        undefined_var: undefined,
        parent: {
            sibling1: true,
            sibling2: false,
            sibling3: null,
            isString: value => {
                if (typeof value === 'string') {
                    return 'string';
                } else {
                    return 'other';
                }
            }
        ],
        'attributes': [
            {
                'attributeId': 'CRM_AVERAGEHOUSEHOLDINCOME',
                'attributeName': 'Income',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ],
                'blockedTabs': [
                    'Campaign'
                ]
            },
            {
                'attributeId': 'CRM_DWELLINGTYPE',
                'attributeName': 'Dwelling Type',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_EDUCATION',
                'attributeName': 'Education',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_EMPLOYMENT',
                'attributeName': 'Employment',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_OCCUPATION',
                'attributeName': 'Occupation',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_ETHNICITY_ENVIRONICS',
                'attributeName': 'Ethnicity',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_IMMIGRATIONPERIOD',
                'attributeName': 'Immigration',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_MARITALSTATUS',
                'attributeName': 'Marital Status',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_LIFESTAGE',
                'attributeName': 'Lifestage',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_PRIZMCLUSTERNAME',
                'attributeName': 'Prizm5',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_HOUSEHOLDSIZE',
                'attributeName': 'Size',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Household',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'LISTCARRIERNAME_',
                'attributeName': 'Wireless carrier',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTTAPADMARKETINGNAME_',
                'attributeName': 'Mobile devices',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': true,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'hideValues': [
                    'Smart TV',
                    'NetCast Smart TV',
                    'Velvet 5G',
                    'Smart Box HD300',
                    'Bravia Smart TV',
                    'Fire TV Stick',
                    'Chromecast'
                ],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTMERGEDMOBILEDEVICES_',
                'attributeName': 'Mobile devices',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'hideValues': [
                    'Smart TV',
                    'NetCast Smart TV',
                    'Velvet 5G',
                    'Smart Box HD300',
                    'Bravia Smart TV',
                    'Fire TV Stick',
                    'Chromecast'
                ],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTHOMEHUBDEVICECOMPUTERS_',
                'attributeName': 'Computers',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTHOMEHUBDEVICEGAMINGCONSOLES_',
                'attributeName': 'Gaming Consoles',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTHOMEHUBDEVICESMARTHOME_',
                'attributeName': 'Smart Home',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTHOMEHUBDEVICESTREAMINGDEVICES_',
                'attributeName': 'Streaming Devices',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTHOMEHUBDEVICEACCESSORIES_',
                'attributeName': 'Accessories',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTTAPADBROWSER_',
                'attributeName': 'Browser',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Devices'
            },
            {
                'attributeId': 'LISTTAPADMANUFACTURER_',
                'attributeName': 'Tapad manufacturer',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': true,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [
                    'DG_EXPLORER'
                ],
                'group': 'Tapad'
            },
            {
                'attributeId': 'LISTTAPADTYPE_',
                'attributeName': 'Tapad device type',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': true,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [
                    'DG_EXPLORER'
                ],
                'group': 'Tapad'
            },
            {
                'attributeId': 'LISTTAPADMODEL_',
                'attributeName': 'Tapad model',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': true,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [
                    'DG_EXPLORER'
                ],
                'group': 'Tapad'
            },
            {
                'attributeId': 'LISTTAPADOS_',
                'attributeName': 'Tapad OS',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': true,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [
                    'DG_EXPLORER'
                ],
                'group': 'Tapad'
            },
            {
                'attributeId': 'LISTHOMEHUBDEVICEMOBILEDEVICESANDWEARABLES_',
                'attributeName': 'Homehub mobile devices',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': true,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [
                    'DG_EXPLORER'
                ],
                'group': 'Tapad'
            },
            {
                'attributeId': 'website',
                'attributeName': 'Website',
                'tokenFrequencyFilter': true,
                'tableName': 'wirelineDailyBehavior',
                'tableType': 'episode',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'hideValues': [
                    'N/A'
                ],
                'group': 'Behavior'
            },
            {
                'attributeId': 'apps',
                'attributeName': 'App',
                'tokenFrequencyFilter': true,
                'tableName': 'wirelineDailyBehavior',
                'tableType': 'episode',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'hideValues': [
                    'N/A'
                ],
                'roles': [],
                'group': 'Behavior'
            },
            {
                'attributeId': 'tier1CategoryName',
                'attributeName': 'Category',
                'tableName': 'wirelineDailyBehavior',
                'tokenFrequencyFilter': true,
                'tableType': 'episode',
                'hideValues': [
                    'N/A'
                ],
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Behavior'
            },
            {
                'attributeId': 'tier2CategoryName',
                'attributeName': 'Interest',
                'tableName': 'wirelineDailyBehavior',
                'tokenFrequencyFilter': true,
                'tableType': 'episode',
                'hideValues': [
                    'N/A'
                ],
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Behavior'
            },
            {
                'attributeId': 'CRM_HOMECSD',
                'attributeName': 'Home CSD',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Places',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_HOMEFSA',
                'attributeName': 'Home postal area',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Places',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_HOMECMA',
                'attributeName': 'Home CMA',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Places',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_HOMEPROVINCE',
                'attributeName': 'Home province',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Places',
                'hideValues': [
                    'CRM_HOMEPROVINCE_14_N/A'
                ]
            },
            {
                'attributeId': 'CRM_MARKET',
                'attributeName': 'Market',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Places',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_TV_OPTIN',
                'attributeName': 'TV',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Opt In',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_INTERNET_OPTIN',
                'attributeName': 'Internet',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [],
                'group': 'Opt In',
                'hideValues': [
                    'N/A'
                ]
            },
            {
                'attributeId': 'CRM_WIRELINE_ACCOUNT_TYPE',
                'attributeName': 'Type',
                'tableName': 'internetHouseholdAttributes',
                'tableType': 'sparrow',
                'hidden': false,
                'extraInfo': [],
                'comment': 'placeholder',
                'roles': [
                    'DG_EXPLORER'
                ],
                'group': 'Segment'
            },
            {
                'attributeId': 'FILEMANAGER_FILTER',
                'attributeName': 'Nested audiences',
                'hidden': false,
                'roles': [],
                'group': 'Nested audiences',
                'virtualAttribute': true
            }
        ],
        '_id': 'WirelineAppConf',
        'filemanager': {
            'DEFAULT_INSTANCE': {
                'defaultSearchActive': true,
                'defaultFilterTypes': [
                    'wireline_workspace'
                ],
                'customFolders': [
                    'MOBILE_AUDIENCES'
                ]
            },
            'SAVE_AS_INSTANCE': {
                'defaultSearchActive': false,
                'defaultFilterTypes': [],
                'customFolders': []
            },
            'PICKER_INSTANCE': {
                'defaultSearchActive': true,
                'defaultFilterTypes': [
                    'tv_workspace',
                    'wireline_workspace',
                    'mobile_workspace',
                    'graph_workspace',
                    'mobile2_workspace'
                ],
                'customFolders': [
                    'MOBILE_AUDIENCES'
                ]
            }
        }
    };
}