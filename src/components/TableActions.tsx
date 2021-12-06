import {Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Icon} from "react-bootstrap-icons";

export type Action = {
  label: string;
  onClick: React.MouseEventHandler<HTMLElement>;
  icon: Icon;
};

export type ActionGroup = {
  name: string;
  actions: Action[];
  disabled?: boolean;
};


export type DownloadActionsProps = {
  actionGroups: ActionGroup[];
};

export default function TableActions(props: DownloadActionsProps) {
  const [actionGroups, setActionGroups] = useState<ActionGroup[]>([]);

  useEffect(() => {
    setActionGroups(props.actionGroups);
  }, [props.actionGroups]);

  return (
    <ButtonToolbar aria-label="Toolbar with button groups">
      {actionGroups.map((actionGroup) =>
        <ButtonGroup className="ms-2" aria-label="Basic example" >
          {actionGroup.actions.map((action: Action) =>
            <Button
              variant="primary"
              key={action.label}
              onClick={actionGroup.disabled ? undefined : action.onClick}
              disabled={actionGroup.disabled}
            >
              {action.label}
            </Button>
          )}
        </ButtonGroup>
      )}
    </ButtonToolbar>
  );
}
