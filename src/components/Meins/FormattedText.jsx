const React = require('react');
const classnames = require('classnames');
const Quote = require('./Quote');

module.exports = props => {
    const {
        className: parentClassName,
        innerHtml,
        inlineElement,
        buildContext
    } = props;

    const offsetClass = inlineElement
        ? `inline-offset-${inlineElement.InlineOffset}`
        : null;

    const className = classnames(
        {
            'text-content': !inlineElement,
            'text-content--with-inline': inlineElement
        },
        parentClassName,
        offsetClass
    );

    if (inlineElement) {
        if (inlineElement.inlineType === 'quote') {
            return (
                <div className={className}>
                    <Quote
                        quote={inlineElement}
                        inline={true}
                        buildContext={buildContext}
                    />

                    <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
                </div>
            );
        } else {
            throw new Error(`Inline type ${inlineElement.type} not supported`);
        }
    } else {
        return (
            <div
                className={className}
                dangerouslySetInnerHTML={{ __html: innerHtml }}
            />
        );
    }
};
