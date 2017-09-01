import ReactDom from 'react-dom';
import Helmet from 'react-helmet';
import Index from './index';
import favicon from './../style/images/favicon.ico';

require('./../style/scss/global.scss');


const app = document.getElementById('mac-react-container');

//app entrypoint
ReactDom.render(
    <div class="app-entry">
        <Helmet
            link={[
                {rel: "icon", href: favicon},
            ]}
        />
        <Index />
    </div>,
    app
);
