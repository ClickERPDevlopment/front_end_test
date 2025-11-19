import React from "react";
import Panel from "../../components/layout/Panel";

const PanelUse: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel Component</h1>

      {/* Basic Panel */}
      <Panel
        header="Basic Panel Header"
        footer="Basic Panel Footer"
        className="mb-6"
      >
        <p>This is the content of the basic panel. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui non saepe nobis vero recusandae est inventore facere aliquid necessitatibus nemo sapiente molestiae assumenda deleniti, ipsum nostrum tempora sunt officiis nesciunt.</p>
      </Panel>

      {/* Collapsible Panel */}
      <Panel
        header="Collapsible Panel Header"
        footer="Collapsible Panel Footer"
        isCollapsible
        defaultCollapsed={false}
        onToggleCollapse={(isCollapsed) => console.log("Panel is collapsed:", isCollapsed)}
        className="mb-6"
      >
        <p>This is the content of the collapsible panel. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, a aspernatur sed maxime, blanditiis, nemo ad in quas ducimus iste porro recusandae asperiores quaerat corporis sit dolorem beatae? Illo, voluptatum?</p>
      </Panel>

      {/* Custom Styled Panel */}
      <Panel
        header={<div className="text-xl font-bold">Custom Header</div>}
        footer={<div className="text-sm">Custom Footer</div>}
        headerClassName="text-white"
        footerClassName=""
        contentClassName=""
        className="mb-6"
      >
        <p>This is the content of the custom styled panel. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae perferendis ipsa officia ipsam enim saepe ipsum magnam ab ad, laborum, facere nisi. Amet quaerat eaque pariatur dicta exercitationem minus beatae.</p>
      </Panel>
    </div>
  );
};

export default PanelUse;