import React, {Component} from 'react';
import {connect} from "react-redux";
import {goPage, nextPage, prevPage} from "../../actions";

class Pagination extends Component {


    onPage(n){
        this.props.onGoPage(n);
    }

    isOnLastPage(){
        // console.log(this.props.perPage * this.props.currentPage, this.props.totalItemsCount);
        return this.props.perPage * this.props.currentPage >= this.props.totalItemsCount;
    }

    totalPages() {
        return Math.ceil(this.props.totalItemsCount / this.props.perPage) || 0;
    }

    getMin(){
        return ((this.props.perPage * this.props.currentPage) - this.props.perPage) + 1;
    }

    getMax() {
        let max = this.props.perPage * this.props.currentPage;
        if (max > this.props.totalItemsCount) {
            max = this.props.totalItemsCount;
        }
        return max;
    }
    onPrev = () => {
        this.props.onPrevPage();
    }

    onNext = () =>  {
        this.props.onNextPage();
    }


    getPages = () => {
        const c = Math.ceil(this.props.totalItemsCount / this.props.perPage);
        const p = this.props.currentPage || 1;
        const pagesToShow = this.props.pagesToShow || 9;
        const pages = [];
        pages.push(p);
        const times = pagesToShow - 1;
        for (let i = 0; i < times; i++) {
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    pages.push(Math.max.apply(null, pages) + 1);
                }
            }
        }
        pages.sort((a, b) => a - b);
        return pages;
    }




    render() {

        console.log(this.props);

        const pages =this.getPages().map(pageNum => {

            let buttonClass = 'page-item';

            if(pageNum === this.props.currentPage) {
                buttonClass += ' active';
            }

            return (<li className={buttonClass} onClick={() => {this.onPage(pageNum)}}><button className="page-link" >{pageNum}</button></li>);
        });

        let prevButtonClass = 'page-item';

        if (this.props.currentPage === 1) {
            prevButtonClass += ' disabled';
        }

        const prevButton = (<li className={prevButtonClass}>
            <button
                className="page-link" onClick={this.onPrev} tabIndex="-1">Previous</button>
        </li>);

        let nextButtonClass = 'page-item';

        if(this.isOnLastPage()) {
            nextButtonClass += ' disabled';
        }

        const nextButton = (
            <li className={nextButtonClass}>
                <button
                    disabled={this.isOnLastPage()}
                    className="page-link" onClick={this.onNext}>Next</button>
            </li>
        );



        return (
            <nav aria-label="...">
                <ul className="pagination">
                    {prevButton}
                    {pages}
                    {nextButton}
                </ul>
            </nav>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ...state.pagination,
        totalItemsCount: state.shop.products.length,
    }
};

export default Pagination;
