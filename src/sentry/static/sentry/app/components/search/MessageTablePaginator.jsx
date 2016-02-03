var React = require('react');
var ReactDOM = require('react-dom');
var PageItem = require('react-bootstrap').PageItem;

var SearchStore = require('../../stores/search/SearchStore');

require('!script!../../../public/javascripts/jquery-2.1.1.min.js');
require('!script!../../../public/javascripts/bootstrap.min.js');


var Page = React.createClass({
    render() {
        var className = "";
        if (this.props.isActive) {
            className += "active";
        }

        return (
            <PageItem href={this.props.href}
                      className={className}
                      disabled={this.props.isDisabled}
                      onSelect={() => this.props.onPageChanged(this.props.page)}>
                {this.props.page}
            </PageItem>
        );
    }
});

var MessageTablePaginator = React.createClass({
    RESULTS_PER_PAGE: 100,
    getInitialState() {
        return {
            paginationWidth: 0
        };
    },
    componentDidMount() {
        this._setPaginationWidth();
        this._initializeAffix();
        $(window).on('resize', this._setPaginationWidth);
    },
    componentWillUnmount() {
        $(window).off('resize', this._setPaginationWidth);
    },
    _initializeAffix() {
        if (this.props.position === 'bottom') {

        }
    },
    _setPaginationWidth() {
        if (this.props.position === 'bottom') {
            this.setState({paginationWidth: ReactDOM.findDOMNode(this.refs.paginatorContainer).clientWidth});
        }
    },
    _numberOfPages() {
        return Math.ceil(this.props.resultCount / this.RESULTS_PER_PAGE);
    },
    _minPage() {
        var currentTenMin = Math.floor(this.props.currentPage / 10) * 10;
        return Math.max(1, currentTenMin);
    },
    _maxPage() {
        if (this.props.currentPage > this._numberOfPages()) {
            return this.props.currentPage;
        }
        var currentTenMax = Math.ceil((this.props.currentPage + 1) / 10) * 10;
        return Math.min(this._numberOfPages(), currentTenMax);
    },
    _onPageChanged(page) {
        var newPage;

        if (page === "Previous") {
            newPage = this.props.currentPage - 1;
        } else if (page === "Next") {
            newPage = this.props.currentPage + 1;
        } else {
            newPage = Number(page);
        }
        SearchStore.page = newPage;
    },
    render() {
        var pages = [];
        pages.push(<Page key="previous" href="#" page="Previous" isDisabled={this.props.currentPage === 1}
                         onPageChanged={this._onPageChanged}/>);
        for (var i = this._minPage(); i <= this._maxPage(); i++) {
            pages.push(<Page key={"page" + i} href="#" page={i} isActive={i === this.props.currentPage}
                             onPageChanged={this._onPageChanged}/>);
        }
        pages.push(<Page key="next" href="#" page="Next" isDisabled={this.props.currentPage >= this._maxPage()}
                         onPageChanged={this._onPageChanged}/>);

        var pagination = (
            <ul className="pagination">
                {pages}
            </ul>
        );

        var nav;
        if (this.props.position === 'bottom') {
            nav = (
                <div ref="paginatorAffix">
                    {this.props.children}
                    <nav className="text-center"
                         style={{width: this.state.paginationWidth + 20}}>
                        {pagination}
                    </nav>
                </div>
            );
        } else {
            nav = <nav className='text-center'>{pagination}</nav>;
        }

        return (
            <div ref="paginatorContainer" id={"message-table-paginator-" + this.props.position }>
                {nav}
            </div>
        );
    }
});

module.exports = MessageTablePaginator;
