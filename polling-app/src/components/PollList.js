import React, { useState, useEffect } from 'react';
import { List, Card, Button, Row, Col } from 'antd';
import supabase from '../supabaseClient';
import styles from './PollList.module.css';

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [results, setResults] = useState({}); // State to hold the results of each poll

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await supabase
        .from('polls')
        .select('*');
      setPolls(data);
    };
    fetchPolls();
  }, []);

  const handleVote = async (pollId, optionSelected) => {
    await supabase
      .from('votes')
      .insert([{ poll_id: pollId, option_selected: optionSelected }]);

    const { data } = await supabase
      .from('votes')
      .select('option_selected')
      .eq('poll_id', pollId);

    const pollResults = data.reduce((acc, vote) => {
      acc[vote.option_selected] = (acc[vote.option_selected] || 0) + 1;
      return acc;
    }, {});

    setResults(prevResults => ({
      ...prevResults,
      [pollId]: pollResults,
    }));
  };
  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={polls}
      renderItem={poll => (
        <List.Item>
          <Card title={poll.question} className={styles.pollCard}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                {poll.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleVote(poll.id, option)}
                    block
                    className={styles.voteButton}
                  >
                    {option}
                  </Button>
                ))}
              </Col>
              <Col span={12}>
                {results[poll.id] && (
                  <div className={styles.resultsContainer}>
                    <h3 className={styles.resultHeading}>Results:</h3>
                    <ul>
                      {poll.options.map((option, index) => (
                        <li key={index} className={styles.resultItem}>
                          {option}: {results[poll.id][option] || 0} votes
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default PollList;
