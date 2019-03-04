import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../../components/Product/Product";

import {brandFilter} from "../../pipes/brandFilter";
import {orderByFilter} from "../../pipes/orderByFilter";
import LayoutMode from "../../components/LayoutMode/LayoutMode";
import {paginationPipe} from "../../pipes/paginationFilter";
import Pagination from "../../components/Pagination/Pagination";

class ProductList extends Component {

    state = {
        colValue : 'col-lg-4',
        perPage: 12,
        currentPage: 1,
        pagesToShow: 3,
    };

    changeLayout = (n) => {
      this.setState({
          colValue: `col-lg-${n}`
      });
    };


    onPrev = () => {
        const updatedState = {...this.state};
        updatedState.currentPage = this.state.currentPage - 1;
        this.setState(updatedState);
    };


    onNext = () => {
        this.setState({
            ...this.state,
            currentPage: this.state.currentPage + 1
        });
    };

    goPage = (n) => {
        this.setState({
            ...this.state,
            currentPage: n
        });
    };


    render() {

        let isActive = this.state.colValue[this.state.colValue.length -1];

        return (
            <div className="col-lg-9">
                <div className="row mb-3">
                    <div className="col-12">
                        <div className="card ">
                            <div className="card-header d-flex justify-content-end">
                                <span className="mr-3">Change Layout: </span>
                                <LayoutMode len={3} isActive={isActive} click={this.changeLayout} />
                                <LayoutMode len={4} isActive={isActive}  click={this.changeLayout} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {paginationPipe(this.props.products, this.state).map(product =>{
                        let classes = `${this.state.colValue} col-md-6 mb-4`;
                        return (<div className={classes}>
                            <Product key={product.id} product={product} />
                        </div>)
                    })}
                </div>
                <div className="d-flex justify-content-end">
                    <Pagination
                        totalItemsCount={this.props.products.length}
                        currentPage={this.state.currentPage}
                        perPage={this.state.perPage}
                        pagesToShow={this.state.pagesToShow}
                        onGoPage={this.goPage}
                        onPrevPage={this.onPrev}
                        onNextPage={this.onNext}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('orderby');
    const brands = state.brandFilter;
    const orderBy = state.orderBy;

    const filterByBrandArr = brandFilter(state.shop.products, brands);
    const filterByOrderArr = orderByFilter(filterByBrandArr, orderBy);


    return {products: filterByOrderArr }
};

export default connect(mapStateToProps, null)(ProductList);
