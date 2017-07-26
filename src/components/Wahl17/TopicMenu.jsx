const React = require('react');

const classnames = require('classnames');

class TopicMenu extends React.Component {
    constructor() {
        super();

        this.state = { active: false };
    }

    render() {
        const { items, selectedTopic, onClick } = this.props;

        const outerClassname = classnames(
            'flex justify-end align-center relative topic-menu',
            {
                'is-active': this.state.active
            }
        );

        const burgerClassname = classnames('burger-menu', {
            open: this.state.active
        });

        return (
            <div className={outerClassname}>
                <div style={{ width: '2rem' /* FIXME too hacky */ }} />
                <div className="topic-menu__title">
                    {selectedTopic}
                </div>
                <div
                    className={burgerClassname}
                    onClick={() =>
                        this.setState({ active: !this.state.active })}
                >
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                <ul className="absolute reset-list topic-menu__items">
                    {items.map(item => {
                        const clickHandler = onClick
                            ? () => {
                                  this.setState({ active: false });
                                  onClick(item.id);
                              }
                            : null;

                        return (
                            <li
                                key={item.text}
                                className="text-right topic-menu__item"
                            >
                                <a
                                    className="block reset-link topic-menu__link"
                                    href={item.href}
                                    onClick={clickHandler}
                                >
                                    {item.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

module.exports = TopicMenu;
