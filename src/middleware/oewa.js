const _ = require('lodash');

// TODO this should come from config
const oewaPixel = function(unique) {
    return `
    <!-- Pixel -->
    <script type="text/javascript" src="http://dispatcher.oewabox.at/oewa.js"> </script>
    <script type="text/javascript">
    var oewa_path = "RedCont/Politik/PolitikInland/v1meins";
    var oewa_unique = "front";
    var OEWA = window.OEWA = {
       "s":"orf",
       "cp": oewa_path + "/" + oewa_unique + "/${unique}" 
    };
    oewa.c({}, OEWA, 2);
    </script>
    <!-- /Pixel -->
`;
};

module.exports = function() {
    return function(tree) {
        if (process.env.NODE_ENV === 'production') {
            _.forEach(tree, (node, url) => {
                node.content = node.content.replace(
                    '</body>',
                    oewaPixel(url) + '\n</body>'
                );
            });
        }

        return tree;
    };
};
