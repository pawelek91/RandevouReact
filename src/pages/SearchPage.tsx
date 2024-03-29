/* eslint-disable eqeqeq */
import React from "react";
import { Redirect } from "react-router";
import DictionaryService from "../services/DictionaryService";
import SearchQueryDto from "../services/dto/SearchQueryDto";
import DictionaryItemDto from "../services/dto/DictionaryItemDto";
import FieldBasicFieldsComponent from "../components/FinderBasicFieldsComponent";
import { SearchUsersService } from "../services/SearchUsersService";
import { UserDto } from "../services/dto/UsersDto";
import SearchResultComponent from "../components/SearchResultComponent";
import { connect } from "react-redux";

interface ISearchPageProps {
  loginInfo: any;
}

class SearchPage extends React.Component<ISearchPageProps> {
  _isMounted = false;
  state = {
    queryDto: new SearchQueryDto(),
    interests: new Array<DictionaryItemDto>(),
    eyesColors: new Array<DictionaryItemDto>(),
    hairColors: new Array<DictionaryItemDto>(),
    searchResult: new Array<UserDto>(),
  };

  dictionaryService = new DictionaryService();
  searchService = new SearchUsersService();

  onFieldChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const name = e.target.name;
    const type = e.target.type;
    if (type === "checkbox") {
      if (this._isMounted)
        this.setState({
          queryDto: {
            ...this.state.queryDto,
            [name]: checked,
          },
        });
    } else {
      if (this._isMounted)
        this.setState({
          queryDto: {
            ...this.state.queryDto,
            [name]: value,
          },
        });
    }
  };

  onDictionaryFieldChange = (e) => {
    if (e.target.name === "eyesColor") {
      if (this._isMounted)
        this.setState({
          queryDto: {
            ...this.state.queryDto,
            eyescolor: e.target.value,
          },
        });
    } else if (e.target.name === "hairColor") {
      if (this._isMounted)
        this.setState({
          queryDto: {
            ...this.state.queryDto,
            haircolor: e.target.value,
          },
        });
    } else {
      let selectedItems = this.state.queryDto.interestids ?? [];

      if (e.target.checked && !selectedItems?.find((x) => x == e.target.name)) {
        selectedItems.push(e.target.name * 1);
      }

      if (!e.target.checked && selectedItems?.find((x) => x == e.target.name)) {
        selectedItems = selectedItems.filter((x) => x != e.target.name);
      }
      if (this._isMounted)
        this.setState({
          queryDto: {
            ...this.state.queryDto,
            interestids: selectedItems,
          },
        });
    }
  };

  searchUsers = () => {
    this.searchService.searchUsers(this.state.queryDto).then((res) => {
      if (res !== undefined) {
        if (this._isMounted)
          this.setState({
            searchResult: res,
          });
      }
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    if (this.props.loginInfo.loggedIn) {
      this.dictionaryService.GetAllInterest().then((result) => {
        if (this._isMounted)
          this.setState({
            interests: result,
          });
      });

      this.dictionaryService.GetAllEyesColors().then((result) => {
        if (this._isMounted)
          this.setState({
            eyesColors: result,
          });
      });

      this.dictionaryService.GetAllHairColors().then((result) => {
        if (this._isMounted)
          this.setState({
            hairColors: result,
          });
      });
    }
  }
  render() {
    const finderStyle = {
      display: "inline-grid",
      width: "35%",
      margin: "10px",
    };

    if (!this.props.loginInfo.loggedIn) {
      return <Redirect to="/login" />;
    }

    const query = this.state.queryDto;

    let eyesColorsFields;
    if (this.state.eyesColors.length > 0) {
      eyesColorsFields = this.state.eyesColors.map((item) => (
        <option key={item.id} value={item.id}>
          {" "}
          {item.displayName}{" "}
        </option>
      ));
    }

    let hairColorsFields;
    if (this.state.eyesColors.length > 0) {
      hairColorsFields = this.state.hairColors.map((item) => (
        <option key={item.id} value={item.id}>
          {" "}
          {item.displayName}{" "}
        </option>
      ));
    }

    let interestsIds;
    if (this.state.interests.length > 0) {
      interestsIds = this.state.interests.map((item) => (
        <label key={item.name}>
          <input
            type="checkbox"
            key={item.name}
            name={item.id + ""}
            onChange={this.onDictionaryFieldChange}
          />
          {item.displayName}
        </label>
      ));
    }

    const searchResponse =
      this.state.searchResult.length > 0 ? this.state.searchResult : null;

    return (
      <div className="finder">
        <div style={finderStyle}>
          <FieldBasicFieldsComponent
            query={query}
            onFieldChange={this.onFieldChange}
          />

          <label htmlFor="eyesColor">Kolor oczu</label>
          <select
            id="eyesColor"
            name="eyesColor"
            onChange={this.onDictionaryFieldChange}
          >
            {eyesColorsFields}
          </select>

          <label htmlFor="hairColor">Kolor włosów</label>
          <select
            id="hairHolor"
            name="hairColor"
            onChange={this.onDictionaryFieldChange}
          >
            {hairColorsFields}
          </select>

          <p>Zainteresowania</p>
          {interestsIds}
          <button type="submit" onClick={this.searchUsers}>
            Wyszukaj
          </button>
        </div>
        <div>
          {searchResponse != null && (
            <SearchResultComponent
              users={searchResponse}
            ></SearchResultComponent>
          )}
        </div>
      </div>
    );
  }
}

export default connect((state, props) => {
  return { loginInfo: state.loginInfo };
})(SearchPage);
