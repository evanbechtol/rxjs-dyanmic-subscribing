import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/button";
import { state } from "./store/sharedStateModule";
import { BehaviorSubject } from "rxjs";
import { v4 as uuidv4 } from "uuid";

interface Subscription {
  name: string;
  subscription: any;
  uid: string;
}

const initialSubscriptionState = {
  name: "Default",
  subscription: {},
  uid: uuidv4(),
};

function App() {
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [subscriptions, setSubscriptions] = useState([
    initialSubscriptionState,
  ] as Subscription[]);

  const btnAttrs = {
    subscribe: {
      buttonText: "Subscribe",
      disabled: false,
      handler: () => {
        // eslint-disable-next-line no-console
        console.log("calling subscribe");
        subscribe(uuidv4(), state);
      },
      name: "subscribe",
      value: "subscribe",
    },
    unsubscribe: {
      buttonText: "Unsubscribe",
      disabled: false,
      handler: () => {
        // eslint-disable-next-line no-console
        console.log("calling unsubscribe");
        unsubscribe(selectedSubscription);
      },
      name: "unsubscribe",
      value: "unsubscribe",
    },
  };

  function subscribe(uid: string, newSub: BehaviorSubject<any>) {
    const sub = newSub.subscribe();
    const subscriptionToAdd = {
      name: `subscriptions ${subscriptions.length + 1}`,
      uid,
      subscription: sub,
    };

    setSubscriptions((prevState) => [...prevState, subscriptionToAdd]);
  }

  function unsubscribe(uid: string) {
    setSubscriptions((prevState) =>
      prevState.filter((sub: Subscription) => sub.uid !== uid)
    );
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(subscriptions);
  }, [subscriptions]);

  const handleSelectionChanged = () => {
    const selectElem = document.getElementById(
      "subscriptions-select-input"
    ) as HTMLInputElement;

    const value = selectElem?.value;

    if (value && value.length) {
      setSelectedSubscription(value);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <select
          id="subscriptions-select-input"
          onChange={handleSelectionChanged}
        >
          {subscriptions.map((sub) => (
            <option key={sub.uid} value={sub.uid}>
              {sub.name}
            </option>
          ))}
        </select>
        <div className="btn-container">
          <Button
            name={btnAttrs.unsubscribe.name}
            buttonText={btnAttrs.unsubscribe.buttonText}
            disabled={btnAttrs.unsubscribe.disabled}
            handler={btnAttrs.unsubscribe.handler}
            value={btnAttrs.unsubscribe.value}
          />

          <Button
            name={btnAttrs.subscribe.name}
            buttonText={btnAttrs.subscribe.buttonText}
            disabled={btnAttrs.subscribe.disabled}
            handler={btnAttrs.subscribe.handler}
            value={btnAttrs.subscribe.value}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
