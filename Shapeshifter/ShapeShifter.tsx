/* eslint-disable no-undef */
import * as React from 'react';
import { TextField, DatePicker, Async, Slider, Dropdown, IDropdownOption } from '@fluentui/react';

export interface IShapeShifterProps {
  label?: string;
  onChange: () => void;
  controlType: ComponentFramework.PropertyTypes.EnumProperty<"TextField" | "Date" | "Slider" | "Dropdown">;
  default?: string | undefined;
  defaultNumber?: number | undefined;
  onSelectedDate?: (date: any) => void;
  onSliderChange?: (newValue: any) => void;
  dropdownOptions: IDropdownOption[];
}

export class ShapeShifter extends React.Component<IShapeShifterProps> {
  private _async: Async = new Async();

  public render(): React.ReactNode {
    let el, theDate;
    switch (this.props.controlType.raw) {
      case "TextField":
        el = <TextField onChange={this._async.debounce(this.props.onChange, 1000)} label={this.props.label} defaultValue={this.props.default}></TextField>
        break;
      case "Date":
        theDate = (this.props.default == undefined) ? new Date() : new Date(this.props.default);
        el = <DatePicker onSelectDate={this.props.onSelectedDate} label={this.props.label} defaultValue={this.props.default} value={theDate}></DatePicker>
        break;
      case "Slider":
        el = <Slider
          label={this.props.label}
          max={11}
          defaultValue={this.props.defaultNumber}
          showValue
          // eslint-disable-next-line react/jsx-no-bind
          onChange={this.props.onSliderChange}
        />
        break;
      case "Dropdown":
        el = <Dropdown
          label={this.props.label}
          defaultSelectedKey={this.props.default}
          options={this.props.dropdownOptions} />
        break;
      default:
        break;
    }
    return el
  }
}
