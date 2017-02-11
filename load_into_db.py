import psycopg2, csv

conn = psycopg2.connect("dbname=diabeatthis")
cur = conn.cursor()
with open ('diabeatthis/static/food.csv') as f:
    reader = csv.reader(f)
    for data in reader:
        for i in data:
            print(i)
            if i is str:
                print(i)
    #     cur.execute('insert into diabeatthis_food (NAME) values (%s)', data[0])
    # cur.commit()
