class Dao {
  constructor(db) {
    this.db = db;
    this.db.exec(`CREATE TABLE IF NOT EXISTS Base 
    (
      symbol TEXT,
      base_price CURRENCY,
      holding BOOLEAN,
      position_mount CURRENCY,
      updated_at DATE);`);
    this.save = this.save.bind(this);
  }

  get({symbols}){
    var stmt = this.db.prepare(`SELECT * FROM Base  WHERE symbol in (${symbols.map(() => '?').join(',')});`);
    var rows = stmt.all(symbols);
    console.log('get: '+JSON.stringify(rows));
    return rows;
  }

  save({symbol,base_price,holding, updated_at}) {
    var stmt = this.db.prepare('select symbol,base_price,holding,position_mount,updated_at from Base where symbol=?');
    var row = stmt.get(symbol);

    if(row){
      console.log('存在，则更新');
      //存在，则更新
      var stmt = this.db.prepare("update Base set base_price = ?, updated_at = ?,holding = ?,position_mount = ? where symbol = ?");
      stmt.run(base_price,updated_at,holding, symbol);
    }else{
      console.log('不存在，则插入');
      //不存在，则插入
      var stmt = this.db.prepare("INSERT INTO Base (symbol,base_price,holding,position_mount,updated_at) VALUES (?,?,?,?,?)");
      stmt.run(symbol,base_price,holding,updated_at);
    }
  }
}


module.exports = Dao;