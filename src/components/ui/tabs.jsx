import { createContext, useContext } from "react";

 
const TabsContext = createContext(null);

 

export function Tabs({ value, onValueChange, className = "", children }) {

  return (

    <TabsContext.Provider value={{ value, onValueChange }}>

      <div className={className}>{children}</div>

    </TabsContext.Provider>

  );

}

 

export function TabsList({ className = "", children }) {

  return <div className={`flex gap-2 ${className}`}>{children}</div>;

}

 

export function TabsTrigger({ value, className = "", children }) {

  const context = useContext(TabsContext);

 

  if (!context) {

    throw new Error("TabsTrigger must be used inside <Tabs>");

  }

 

  const isActive = context.value === value;

 

  return (

    <button

      type="button"

      onClick={() => context.onValueChange?.(value)}

      className={[

        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",

        isActive

          ? "bg-slate-900 text-white"

          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",

        className,

      ].join(" ")}

    >

      {children}

    </button>

  );

}

 

export function TabsContent({ value, className = "", children }) {

  const context = useContext(TabsContext);

 

  if (!context) {

    throw new Error("TabsContent must be used inside <Tabs>");

  }

 

  if (context.value !== value) return null;

 

  return <div className={className}>{children}</div>;

}