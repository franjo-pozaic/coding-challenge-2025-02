DO $$
DECLARE
    i integer := 1;
    start_time timestamptz := '2025-05-01T00:00:00Z';
    end_time timestamptz;
BEGIN
    WHILE i <= 100000 LOOP -- Insert 100,000 entries (adjust as needed)
        end_time := start_time + interval '1 hour';
        INSERT INTO slots (start_date, end_date, booked, booked_by)
        VALUES (start_time, end_time, FALSE, NULL);

        start_time := start_time + interval '1 hour';
        i := i + 1;
    END LOOP;

    i := 1;
    start_time := '2025-05-02T00:00:00Z';

    WHILE i <= 10000 LOOP --insert 10,000 booked slots.
        end_time := start_time + interval '1 hour';
        INSERT INTO slots (start_date, end_date, booked, booked_by)
        VALUES (start_time, end_time, TRUE, 'Stress test user ' || i);

        start_time := start_time + interval '1 hour';
    i := i + 1;
    END LOOP;

END $$;
