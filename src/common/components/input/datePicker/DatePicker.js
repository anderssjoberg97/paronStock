import React from "react";
import PropTypes from "prop-types";
import {render} from "react-dom";
import classnames from "classnames";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/datePicker.scss");
}
/**
 * Class for a UI-element for picking a date from a dropdown calendar
 */
export default class DatePicker extends React.Component{

    /**
     * Sets up the inital state
     */
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            date: new Date()
        };
        this.props.onSelect(this.state.date);
    }

    /**
     * Renders the datepicker
     */
    render(){
        return(
            <div className={classnames("datePicker")}>
                <div className="calendarHover" onClick={() => {
                    this.setState({isOpen: !this.state.isOpen});
                }}>
                    <div className="selectedDate">
                        <span>{this.state.date.toLocaleDateString()}</span>
                    </div>
                    <div className="dropDownArrow"></div>
                </div>
                <div className="dropDownArrow"></div>
                {this.state.isOpen ? this.getDropDownCalendar() : null}
            </div>
        );
    }

    /**
     * Generates a calendar based on date
     * @return A drop down calendar DOM element
     */
    getDropDownCalendar(){
        let today = new Date();
        let firstDayOfMonth = new Date(
            this.state.date.getFullYear(),
            this.state.date.getMonth(),
            1
        );
        let lastDayOfMonth = new Date(
            this.state.date.getFullYear(),
            this.state.date.getMonth() + 1,
            0
        );
        //Number of blank days in calendar
        let daysBeforeInCalendar =
            firstDayOfMonth.getDay() == 0 ? 6 : firstDayOfMonth.getDay() - 1;
        let daysAfterInCalendar =
            lastDayOfMonth.getDay() == 0 ? 0 : 7 - lastDayOfMonth.getDay();

        //Store calendar days in a week
        let weekdays = [];
        //Stores the weeks
        let weeks = [];
        //Loop through all days of month and merge them into a calendar week by week
        for(let i = 1; i <= lastDayOfMonth.getDate(); ++i){

            for(let j = 0; i == 1 && j < daysBeforeInCalendar; ++j){
                weekdays.push(
                    <div className="calendarDate emptyCalendarDate"></div>
                );
            }
            //Check if date does not go back in time
            let currentLoopDate = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), i);
            weekdays.push(
                <div
                    className={
                        classnames("calendarDate", "validCalendarDate", i == this.state.date.getDate() ? "currentCalendarDate" : "")
                    }
                    onClick={() => {
                        this.setState({
                            isOpen:false,
                            date: currentLoopDate
                        }, () => {
                            this.props.onSelect(this.state.date);
                        });
                    }}>
                    <span>{this.addZeroPrefix(i)}</span>
                </div>
            );

            for(let j = 0;
                i == lastDayOfMonth.getDate() && j < daysAfterInCalendar;
                ++j){
                weekdays.push(
                    <div className="calendarDate emptyCalendarDate"></div>
                );
            }

            if((firstDayOfMonth.getDay() + i - 1) % 7 == 0 ||
                i == lastDayOfMonth.getDate()){
                weeks.push(
                    <div className="calendarWeek">
                        {weekdays}
                    </div>
                );
                weekdays=[];
            }
        }

        //Get an array of week day names
        let weekDayNames = [];

        for(let i = 1; i < 7; ++i){
            weekDayNames.push(
                <div className="calendarWeekDayName">
                    <span>{this.getDayNameShort(i)}</span>
                </div>
            );
        }
        weekDayNames.push(
            <div className="calendarWeekDayName">
                <span>{this.getDayNameShort(0)}</span>
            </div>
        );

        //Check if skipMonthLeft button should be functioning
        let skipMonthLeft = (
            <div className="calendarSkipMonth calendarSkipMonthLeft calendarSkipMonthValid">
                <div onClick={() => {
                    let previousMonth = new Date(
                        this.state.date.getFullYear(),
                        this.state.date.getMonth(),
                        1
                    );
                    previousMonth.setDate(0);
                    this.setState({date: previousMonth}, () => {
                        this.props.onSelect(this.state.date);
                    });
                }}></div>
            </div>
        );
        //Return a calendar header with the weeks
        return (
            <div className="dropDownCalendar">
                {skipMonthLeft}
                <div className="calendarHeader">
                        <span className="calendarMonth">
                            {this.getMonthName(this.state.date)}
                        </span>
                        <span className="calendarYear">
                            {this.state.date.getFullYear()}
                        </span>
                </div>
                <div className="calendarSkipMonth calendarSkipMonthRight calendarSkipMonthValid">
                    <div onClick={() => {
                        let nextMonth = new Date(
                            this.state.date.getMonth() == 11 ? this.state.date.getFullYear() + 1 :  this.state.date.getFullYear(),
                            this.state.date.getMonth() == 11 ? 0 :  this.state.date.getMonth() + 1,
                            1
                        );
                        this.setState({date: nextMonth}, () => {
                            this.props.onSelect(this.state.date);
                        });

                    }}></div>
                </div>
                <div className="calendarWeekDayNames">{weekDayNames}</div>
                {weeks}
            </div>
        );
    }

    /**
     * Returns the weekday name of a Date object
     * @param date The date or the week day number
     */
    getDayNameShort(date){
        let days = ["sön", "mån", "tis", "ons", "tor", "fre", "lör"];
        if(date instanceof Date){
            return days[date.getDay()];
        } else {
            return days[date];
        }
    }

    /**
     * Adds a zero prefix to a number if it contains a single digit.
     */
    addZeroPrefix(number){
        return ("0" + number).slice(-2);
    }

    /**
     * Returns the full name of month based on date
     * @param date A Date-object
     */
    getMonthName(date){
        let months=["januari", "februari", "mars", "april", "maj", "juni",
            "juli", "augusti", "september", "oktober", "november", "december"];
        return months[date.getMonth()];
    }
}

DatePicker.propTypes = {
    onSelect: PropTypes.func.isRequired
};
