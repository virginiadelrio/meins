const $ = require('jquery');
const _ = require('lodash');

/**
 * spec:
 * - {$gt: x, $lt: y}
 * - [{$gt: x, $lt: y}, {$lte: z}] TBI
 */
function matchesSpec(spec, value) {
    const $document = $(document);
    const $window = $(window);
    
    return _.every(spec, (refValue, type) => {
        switch(type) {
        case '$gt':
            return value > refValue;
        case '$gte':
            return value >= refValue;
        case '$lt':
            return value < refValue;
        case '$lte':
            return value <= refValue;
        case '$eq':
            return value === refValue;
        case 'bottom':
            return value + $window.height() >= $document.height() - refValue;
        default:
            throw new Error(`Unknown operator ${type}`);
        }
    });
}

module.exports = class ScrollManager {
    constructor(el=window) {
        this.subscriptions = [];
        this.$el = $(el);
        this.$el.scroll(this._onScroll.bind(this));
    }

    register(spec, {on, off}) {
        const newSubscription = {spec, on, off};
        this._handleSubscription(newSubscription);
        this.subscriptions.push(newSubscription);
    }

    _handleSubscription(subscription) {
        const {spec, on, off, state} = subscription;
        const scrollTop = this.$el.scrollTop();
        
        if(matchesSpec(spec, scrollTop)) {
            if(state === 'off' || state == null) {
                on();
                subscription.state = 'on';
            }
        } else {
            if(state === 'on' || state == null) {
                off();
                subscription.state = 'off';
            }
        }
    }

    _onScroll() {
        this.subscriptions.forEach(subscription => {
            this._handleSubscription(subscription);
        });
    }
};
