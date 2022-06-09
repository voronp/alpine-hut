import { ComponentType, FC, MouseEvent, useState } from "react";
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple} from 'primereact/ripple';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

interface DisablableProps {
  IsEditDisabled: boolean;
}

export default function withConfirmUnlock<T extends DisablableProps>(FormComponent:ComponentType<T>):FC<Omit<T, 'IsEditDisabled'> & {title: string}> {
  return (props:T&{title: string}) => {
  const [IsLocked, setIsLocked] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const confirm = () => {
    if (!IsLocked) return;
    confirmDialog({
        message: `Are you sure you want to edit ${props.title}?`,
        header: 'Unlock edit',
        icon: 'pi pi-exclamation-triangle',
        accept: () => setIsLocked(false),
        reject: () => setIsLocked(true),
    });
  }
  const template = (options:PanelHeaderTemplateOptions) => {
    const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
    const className = `${options.className} justify-content-start`;
    const titleClassName = `${options.titleClassName} pl-1`;
    const lockIcon = `pi pi-lock${IsLocked ? '' : '-open'}`;
    const confirmOrExpand = (e:MouseEvent<HTMLElement>) => {
      if (isCollapsed) {
        options.onTogglerClick(e);
        setIsCollapsed(false); // doesn't affect panel state but should be triggered to redefine template with correct isCollapsed
        return;
      }
      confirm();
    }

    return (
        <div className={className}>
            <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                <span className={toggleIcon}></span>
                <Ripple />
            </button>
            <span className={titleClassName}>
                Core parameters
            </span>
            <button className='p-panel-header-icon p-link' onClick={confirmOrExpand}>
                <span className={lockIcon}></span>
                <Ripple />
            </button>
        </div>
    )
}
  return (<Panel headerTemplate={template} toggleable collapsed={isCollapsed}>
      <ConfirmDialog />
      <div onClick={confirm}>
        <FormComponent IsEditDisabled={IsLocked} {...props}/>
      </div>
    </Panel>);
}
};
