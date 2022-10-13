import React, {Component} from 'react';
import BrandFilter from "../../components/BrandFilter/BrandFilter";
import OrderFilter from "../../components/OrderFilter/OrderFilter";

class FilterBar extends Component {
    render() {
        return (
            //this is a div
            <div className="col-lg-3">
                <div className="row">
                    <div className="col-12">
                        <BrandFilter/>
                    </div>
                    <div className="col-12">
                        <OrderFilter/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterBar;