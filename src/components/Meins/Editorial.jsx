const React = require('react');

module.exports = () => {
    return (
        <div className="editorial rmt4">
            <div className="row editorial__contributors editorial__release">
                <div className="editorial__contributor">
                    <a href="#" className="contributor">
                        <img
                            src="assets/who/irina.gif"
                            className="contributor__image"
                        />
                        <div className="contributor__name u-line-height-1">
                            Irina O.
                        </div>
                        <div className="contributor__role hide-lt-lg">
                            Redaktion
                        </div>
                    </a>
                </div>
                <div className="editorial__contributor">
                    <a href="#" className="contributor">
                        <img
                            src="assets/who/flo.gif"
                            className="contributor__image"
                        />
                        <div className="contributor__name u-line-height-1">
                            Florian M.
                        </div>
                        <div className="contributor__role hide-lt-lg">
                            Redaktion | Technik
                        </div>
                    </a>
                </div>
                <div className="editorial__contributor">
                    <a href="#" className="contributor">
                        <img
                            src="assets/who/joanna.gif"
                            className="contributor__image"
                        />
                        <div className="contributor__name u-line-height-1">
                            Joanna S.
                        </div>
                        <div className="contributor__role hide-lt-lg">
                            Grafik
                        </div>
                    </a>
                </div>
                <div className="editorial__contributor">
                    <a href="#" className="contributor">
                        <img
                            src="assets/who/simone.gif"
                            className="contributor__image"
                        />
                        <div className="contributor__name u-line-height-1">
                            Simone G.
                        </div>
                        <div className="contributor__role hide-lt-lg">
                            Redaktion
                        </div>
                    </a>
                </div>
                <div className="release">
                    <div className="release__number">
                        <strong>Nr: 23</strong> | Mai 2016
                    </div>
                    <div className="release__text">Beiträge:</div>
                </div>
            </div>
            <div className="editorial__infos" />
        </div>
    );
};
