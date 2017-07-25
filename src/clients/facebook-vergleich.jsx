'use strict';

import Promise from 'bluebird';
window.Promise = Promise;

import React from 'react';
import ReactDOM from 'react-dom';

import toPairs from 'lodash/fp/toPairs';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import take from 'lodash/fp/take';
import drop from 'lodash/fp/drop';
import sortBy from 'lodash/fp/sortBy';
import flow from 'lodash/fp/flow';

import classnames from 'classnames';
import axios from 'axios';

import TopicMenu from '../components/Wahl17/TopicMenu.jsx';

const PAGE_SIZE = 15;
/* const URL = '/postings/posting/_search';*/
const URL = 'https://api.einser.info/_search/postings/posting';

const watchlist = {
    diegruenen: 'gruene',
    'ulrike.lunacek': 'gruene',

    TeamStronach: 'stronach',

    fpoe: 'fpoe',
    HCStrache: 'fpoe',

    NeosDasNeueOesterreich: 'neos',
    'matthias.strolz': 'neos',

    Volkspartei: 'oevp',
    'sebastiankurz.at': 'oevp',

    Sozialdemokratie: 'spoe',
    'bundeskanzler.christian.kern': 'spoe'
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.queries = {
            fluechtlinge: {
                caption: 'Flüchtlinge',
                query: {
                    'asyl*': 3,
                    flüchtling: 3,
                    'zuwander*': 3,
                    schlepper: 3,
                    islam: 3,
                    afghane: 3,
                    integration: 3,
                    syrer: 3
                }
            },
            integration: {
                caption: 'Integration',
                query: {
                    integration: 3,
                    integrationsunwillig: 3,
                    zuwanderer: 3,
                    arbeitsmarktöffnung: 3,
                    arbeitserlaubnis: 3
                }
            },
            pension: {
                caption: 'Pension',
                query: {
                    pension: 3,
                    hacklerregelung: 3,
                    altersarmut: 3
                }
            },
            sicherheit: {
                caption: 'Sicherheit',
                query: {
                    mord: 3,
                    vergewaltigung: 3,
                    sicherheit: 3,
                    raub: 3,
                    überfall: 3
                }
            },
            untersuchungsausschuss: {
                caption: 'Untersuchungsausschuss',
                query: {
                    untersuchungsausschuss: 3,
                    uausschuss: 3,
                    ausschuss: 3
                }
            }
        };

        this.state = {
            isLoading: false,
            matches: [],
            skip: 0,
            query: 'fluechtlinge',
            mobileSelected: 'gruene'
        };
    }

    render() {
        const { query } = this.state;

        const queryItems = flow(
            toPairs,
            filter(([key]) => key !== query),
            map(([id, { caption: text }]) => ({ id, text }))
        )(this.queries);

        return (
            <div className="fbc-container">
                <TopicMenu
                    selectedTopic={this.queries[query].caption}
                    items={queryItems}
                    onClick={this.handleSelect.bind(this)}
                />
                <div className="fbc-header">
                    {this.renderControls()}
                </div>
                {this.renderPosts()}
                {this.renderFooter()}
            </div>
        );
    }

    renderPost(p) {
        const [pageId, postId] = p.id.split('_');
        const width = window.innerWidth <= 640 ? 290 : 574;

        return (
            <div
                className={`fb-post ${watchlist[p.fb_page]}`}
                data-href={`https://www.facebook.com/${pageId}/posts/${postId}/`}
                data-width={width}
                data-show-text="true"
            />
        );
    }

    renderPosts() {
        const { skip, matches: posts } = this.state;

        if (posts == null || posts.length === 0) {
            return null;
        }

        const visiblePosts = flow(
            sortBy(p => -new Date(p.created_at)),
            drop(skip),
            take(PAGE_SIZE)
        )(posts);

        const left = [],
            right = [];

        for (let ii = 0; ii < visiblePosts.length; ii++) {
            if (ii % 2 === 0) {
                left.push(visiblePosts[ii]);
            } else {
                right.push(visiblePosts[ii]);
            }
        }

        const desktopPostings = [left, right].map(column =>
            <div className="post-column">
                {map(p => this.renderPost(p), column)}
            </div>
        );

        const mobilePostings = (
            <div className="post-column">
                {visiblePosts.map(p => this.renderPost(p))}
            </div>
        );

        return (
            <div>
                <div className="hide-lt-lg">
                    <div className="posts">
                        {desktopPostings}
                    </div>
                </div>
                <div className="show-lt-lg">
                    <div className="posts">
                        {mobilePostings}
                    </div>
                </div>
            </div>
        );
    }

    renderControls() {}

    renderFooter() {
        const { skip, isLoading } = this.state;

        const className = classnames('fbc-button', 'fbc-button--more', {
            'fbc-button--disabled': isLoading
        });

        return (
            <div className="fbc-footer">
                <a
                    className={className}
                    href="#fb-compare"
                    onClick={e => {
                        if (isLoading) {
                            e.preventDefault();
                        } else {
                            this.setState({ skip: skip + PAGE_SIZE });
                        }
                    }}
                >

                    Ältere Postings
                </a>
            </div>
        );
    }

    executeQuery(query) {
        if (this.state.isLoading) {
            return;
        }

        this.setState({
            query,
            isLoading: true,
            matches: [],
            skip: 0
        });

        const queryParts = map(([term, weight]) => {
            const key = term.match(/[*?]/) ? 'query_string' : 'multi_match';

            // weight currently ignored

            return {
                [key]: {
                    query: term,
                    fields: ['message', 'description']
                }
            };
        })(toPairs(this.queries[query].query));

        axios
            .post(URL, {
                size: 200,
                query: {
                    function_score: {
                        query: {
                            bool: {
                                should: queryParts,
                                must_not: [
                                    {
                                        match: { type: 'video' }
                                    }
                                ]
                            }
                        },
                        functions: [
                            {
                                exp: {
                                    created_at: {
                                        origin: 'now',
                                        scale: '14d',
                                        offset: 0,
                                        decay: 0.5
                                    }
                                }
                            }
                        ]
                    }
                }
            })
            .then(({ data: { hits: { hits } } }) => {
                return hits.map(({ _source }) => _source);
            })
            .then(sortedDocs => {
                this.setState({
                    isLoading: false,
                    matches: sortedDocs
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentDidMount() {
        this.executeQuery(this.state.query);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            window.FB &&
            ((prevState.matches.length === 0 &&
                this.state.matches.length > 0) ||
                prevState.skip !== this.state.skip)
        ) {
            window.FB.XFBML.parse();
        }
    }

    handleSelect(id) {
        this.executeQuery(id);
    }
}

ReactDOM.render(<App />, document.getElementById('fb-root'));
