const SVGEditor = (function(){  
  var commandsMatrix = {
    m(value) {
      const [x, y] = value;
      return { x, y };
    },
    mHandTool(value) {
      const [x, y] = value;
      const el = <circle cx={x} cy={y} r="3" fill="brown" stroke="gray"/>
      return el;
    },
    l(value) {
      const [x, y] = value;
      return { x, y };
    },
    lHandTool(value) {
      const [x, y] = value;
      const el = <circle cx={x} cy={y} r="3" fill="cyan" stroke="gray"/>
      return el
    },
    h(value) {
      return { x: value[0] };
    },
    v(value) {
      return { y: value[0] };
    },
    c(value) {
      const [x1, y1, x2, y2, x, y] = value;
      return { x1, y1, x2, y2, x, y };
    },
    cCircle(value) {
      const [x1, y1, x2, y2, x, y] = value;
      const xyEl = <circle cx={x} cy={y} r="3" fill="violet" stroke="gray"/>;
      const xy1El = <circle cx={x1} cy={y1} r="3" fill="violet" stroke="gray"/>;
      const xy2El = <circle cx={x2} cy={y2} r="3" fill="violet" stroke="gray"/>;
      const linexy2El =  <line x1={x} y1={y} x2={x2} y2={y2} stroke="black" />


      return <g>{xyEl} {xy1El} {xy2El} {linexy2El}</g>;
    },
    s(value) {
      const [x2, y2, x, y] = value;
      return { x2, y2, x, y };
    },
    sHandTool(value) {
      const [ x2, y2, x, y] = value;
      const xyEl = <circle cx={x} cy={y} r="3" fill="violet" stroke="gray"/>;
      const xy2El = <circle cx={x2} cy={y2} r="3" fill="violet" stroke="gray"/>;
      const linexy2El =  <line x1={x} y1={y} x2={x2} y2={y2} stroke="black" />;
      return <g>{xyEl} {xy2El} {linexy2El}</g>;
    },
    q(value) {
      const [x1, y1, x, y] = value;
      return { x1, y1, x, y };
    },
    qHandTool(value) {
      const [x1, y1, x, y] = value;
      const xyEl = <circle cx={x} cy={y} r="3" fill="violet" stroke="gray"/>;
      const xy1El = <circle cx={x1} cy={y1} r="3" fill="violet" stroke="gray"/>;
      const linexy2El =  <line x1={x1} y1={y1} x2={x} y2={y} stroke="black" />
      return <g className="q-hand-tools">{xyEl} {xy1El} {linexy2El}</g>;
    },
    a(value) {
      const [rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y] = value;
      return { rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y };
    },
    aHandTool(value) {
      const [rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y] = value;
      const xyEl = <circle cx={x} cy={y} r="3" fill="violet" stroke="gray"/>;
      return { rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y };
    }
  };
  function dToArray(d) {
    return d
      .match(/[A-Za-z]\s+[^A-Za-z]+/gi)
      .map((item) => item.trim())
      .map((item) => {
      const command = item.match(/[A-Za-z]{1,}/gi)[0];
      const value = item.match(/[^A-Za-z]{1,}/gi)[0]?.trim();
      const params = value.split(/[,\s+]/gi).filter(v => v);
      console.log('item: ', item);
      return [command, value, params];
    });
  }

  const SmartPath = ({d}) => {  
    let pathElement = React.createRef();
    const [selected, setSelected] = React.useState(false);
    const handleClick = event => {
      setSelected(!selected);
      event.target.setAttribute('data-foo', 'bar');
    }
    return d ? <path ref={pathElement} onClick={handleClick} d={d} stroke="black" fill="green" stroke-width="1" fill-opacity="0.5"/> : <text x="20" y="35" class="small">No figure defined</text>
  };

  const SVG = ({d}) => {
    let bkg_d = '';
    const bkg_width = 620;
    const bkg_height = 520;
    /*
    for(let i = 0; i < bkg_width; i+=10){
      bkg_d += `M ${i} -10 L ${i} ${bkg_height}\n`;
    }
    for(let i = 0; i < 315; i+=10){
      bkg_d += `M -10 ${i} L ${bkg_width} ${i}\n`;
    }
    */
    let points = [];
    try{ points = dToArray(d);}catch(ex){}
    return <svg className="svg-canvas" width={bkg_width} height={bkg_height} xmlns="http://www.w3.org/2000/svg">
      <path d={''} stroke="#00000011" fill="transparent" stroke-width=".5" ></path>
      {points.map(item => {
        const [command, value, params] = item;
        const key = command.toLowerCase();
        const paramss = commandsMatrix[key](params);
        console.log('|---->> ', command, ': ', paramss);
        // commandsMatrix['qHandTool'](params)
        const onDrag = event => console.log(event);
        function dragStart(event){ console.log('ondragstart event: ', event); }
        function drop(event){ console.log('ondrop event: ', event); }
        return <circle 
                 onDragstart={onDrag} 
                 onDragStart={dragStart}
                 onClick={onDrag}
                 onDrag={onDrag} 
                 draggable="true" 
                 onDrop={drop}
                 cx={paramss.x} cy={paramss.y} r="13" fill="#00ffff59" stroke="gray"/>
      })}
    <SmartPath d={d} />
  </svg>
  };

  return () => {
  
    const examples = [
      {
        name: 'Complex shape',
        value: `M 10 315
  L 110 215
  A 30 50 0 0 1 162.55 162.45
  L 172.55 152.45
  A 30 50 -45 0 1 215.1 109.9
  L 315 10`
      },
      {
        name: 'Round corners',
        value: `M 20 10
  L 305 10
  Q 315, 10 315, 20
  L 315 305
  Q 315, 315 305, 315
  L 20 315
  Q 10, 315 10, 305
  L 10 20
  Q 10, 10 20, 10
  `
      },
      {
        name: 'Circle',
        value: `M 15,15
  a 5,5 0 1 1 0,10 
  a 5,5 0 1 1 0,-10`
      },
      {
        name: 'Heart',
        value: `M 10,30
  A 20,20 0,0,1 50,30
  A 20,20 0,0,1 90,30
  Q 90,60 50,90
  Q 10,60 10,30
  z`
      }
    ];
    let [d, setD] = React.useState(examples[0].value);
    let [activeExample, setActiveExample] = React.useState('');
    const txtEditor = React.createRef();

    const txtEditorChanged = (e) => {
      const val = e.target.value;
      setD(val);
      txtEditor.value = val;
      console.info(e.target.value);
    }
    const pickExample = (item)=>{
      setActiveExample(item.value);    
      setD(item.value);
      examples.forEach(ex => (ex.active = false));
      item.active = true;
    }

    return <>
      <div className="">
        <h2>SVG Editor</h2>
        <hr />
          <p>{/* Examples */}
            {examples.map(item => {
              const className = `btn btn-light btn-sm me-2 examples-list ${item.active ? 'active' : ''}`;
              return <span className={className} onClick={() => pickExample(item)}>{item.name}</span>
            })}
          </p>
        <div className="d-flex">
          <SVG d={d} />
          <div>
            <textarea ref={txtEditor} rows="15" cols="20"
               onChange={txtEditorChanged}
                defaultValue={d}/>
            <div class="p-2"><button class="btn btn-primary btn-sm disabled">Save</button></div>
          </div>
        </div>
      </div>
      </>;
  };
})();
